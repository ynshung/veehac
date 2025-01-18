import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc, updateDoc, query, where, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from '../firebase';
import '../styles/ProjectSubmissionForm.css';
import { onAuthStateChanged } from 'firebase/auth';
import {fetchCaseStudies, fetchParticipantProject, fetchTeamIdByUserUid} from '../controller/controller';
import DOMPurify from 'dompurify';

const sanitiseInput = (input) => {
  console.log("input:", input);
  console.log("sanitised input:", DOMPurify.sanitize(input));
  return DOMPurify.sanitize(input);
};

const ProjectSubmissionForm = ({ onClose }) => {
  const [teamID, setTeamID] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [caseStudy, setCaseStudy] = useState('');
  const [slideFile, setSlideFile] = useState(null);
  const [ytLink, setYtLink] = useState('');
  const [prototypeLink, setPrototypeLink] = useState('');
  const [fileError, setFileError] = useState(false);
  const [slideFileName, setSlideFileName] = useState('');
  const [existingProjectId, setExistingProjectId] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return;
      }
      fetchParticipantProject(user.uid).then((participantProject) => {
        if (participantProject) {
          setExistingProjectId(participantProject.id);
          setTitle(participantProject.data.title || "");
          setDescription(participantProject.data.description || "");
          setCaseStudy(participantProject.data.caseStudy || "");
          setYtLink(participantProject.data.ytLink || "");
          setPrototypeLink(participantProject.data.prototypeLink || "");
          setSlideFileName(participantProject.data.slideFileName);
          setImagePreview(participantProject.data.imageBase64);
        }
      });
      

      const teamID = await fetchTeamIdByUserUid(user.uid);
      setTeamID(teamID);
    });
    fetchAndSetCaseStudies();
  }, []);

  const fetchAndSetCaseStudies = async () => {
    try {
      const fetchedCaseStudies = await fetchCaseStudies();
      setCaseStudies(fetchedCaseStudies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) { // 10MB
      setFileError(true);
      setSlideFile(null);
      if (!slideFileName) {
        setSlideFileName('');
    }} else {
      setFileError(false);
      setSlideFile(file);
      setSlideFileName(file.name);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageURL = await getDownloadURL(storageRef);
      
      // Update state with the image URL
      setImagePreview(imageURL);
      setImageFile(imageURL);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const projectData = {
        title: sanitiseInput(title),
        description: sanitiseInput(description),
        caseStudy: sanitiseInput(caseStudy),
        slideFileName: sanitiseInput(slideFileName),
        ytLink: sanitiseInput(ytLink),
        prototypeLink: sanitiseInput(prototypeLink),
        imageBase64: sanitiseInput(imageFile || imagePreview), // Use existing image if no new upload
        id: 0,
        submissionTime: new Date(),
        judge: null,
        judgeDescription: "",
        judged: false,
        pitching: 0,
        uniqueness: 0,
        business: 0,
        design: 0,
        ideaImpact: 0
      };
  
      if (existingProjectId) {
        const projectDocRef = doc(db, "project", existingProjectId);
        await updateDoc(projectDocRef, projectData);
        alert("Project Updated!");
      } else {
        const projectRef = await addDoc(collection(db, "project"), projectData);
        await updateDoc(doc(db, "team", teamID), {
          projectID: projectRef.id
        });
        alert("Project Submitted!");
      }
    } catch (error) {
      console.error("Error adding/updating document: ", error);
      alert("Error submitting project. Please try again.");
    }
  
    if (onClose) {
      onClose();
    }
  
    window.location.reload();
  };
  

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <div className="project-submission__body">
        <h2 style={{ marginTop: '0%' }}>Project Submission</h2>
        <form id="project-submission-form" onSubmit={handleSubmit}>
          <div>
            <div className="project-submission__full-width-underline">1. Project Name & Description:</div>
            <p>Enter your project title *</p>
            <input
              type="text"
              id="project-title"
              name="project-title"
              className="project-submission__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <p>Enter your project description *</p>
            <input
              type="text"
              id="project-desc"
              name="project-desc"
              className="project-submission__input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="project-submission__full-width-underline">2. Case Study:</div>
            <p>Choose your case study *</p>
<select
  id="case-study"
  name="case-study"
  className="project-submission__select"
  value={caseStudy}
  onChange={(e) => setCaseStudy(parseInt(e.target.value))}
  required
>
  <option value="">Select a case study</option>
  {caseStudies
    .sort((a, b) => a.id - b.id)
    .map((caseStudy) => (
    <option key={caseStudy.id} value={caseStudy.id}>
      Case Study {caseStudy.id}: {caseStudy.title}
    </option>
  ))}
</select>
          </div>
          <div>
            <div className="project-submission__full-width-underline">3. Slide Upload:</div>
            <p>Upload your presentation slides *</p>
            <div className="project-submission__rectangle-small">Maximum size limit: 10MB</div>
            <label htmlFor="slide-file" className="project-submission__rectangle-big">
              <i className="fa-solid fa-upload"></i>
              <p style={{ margin: 0 }}>Click to Upload Slide</p>
              <p style={{ margin: 0 }}>Accepted File Type: PDF & PPT</p>
              <p id="slide-file-name" className="project-submission__file-name">File name: {slideFileName}</p>
              <input
                id="slide-file"
                name="slide_file"
                type="file"
                accept=".pdf, .pptx, .ppt"
                style={{ opacity: 0, fontSize: '0rem', padding: 0, margin: 0 }}
                onChange={handleFileChange}
              />
            </label>
            {fileError && (
              <p className="project-submission__error-message">
                File size exceeds the maximum limit of 10MB.
              </p>
            )}
          </div>
          <div>
            <div className="project-submission__full-width-underline">4. Link Upload:</div>
            <p>Enter your presentation YouTube video link *</p>
            <input
              type="text"
              id="vid-link"
              name="vid-link"
              className="project-submission__input"
              value={ytLink}
              onChange={(e) => setYtLink(e.target.value)}
              required
            />
            <p>Enter your prototype link *</p>
            <input
              type="text"
              id="proto-link"
              name="proto-link"
              className="project-submission__input"
              value={prototypeLink}
              onChange={(e) => setPrototypeLink(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="project-submission__full-width-underline">5. Image Upload:</div>
            <p>Upload a representative image for your project</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ marginTop: '10px', maxWidth: '100%' }}
              />
            )}
          </div>
          <div className="project-submission__submit-button-container">
            <button className="project-submission__submit-button" type="submit">
              <i className="fa-solid fa-check"></i> Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectSubmissionForm;
