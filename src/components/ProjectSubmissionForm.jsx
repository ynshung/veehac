import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc, updateDoc, query, where, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from '../firebase';
import '../styles/ProjectSubmissionForm.css';
import { onAuthStateChanged } from 'firebase/auth';

const fetchUserData = async (userId) => {
  // Step 1: Check the "team" collection for matching userId
  const teamQueries = [
    query(collection(db, "team"), where("leaderID", "==", userId)),
    query(collection(db, "team"), where("memberID1", "==", userId)),
    query(collection(db, "team"), where("memberID2", "==", userId)),
    query(collection(db, "team"), where("memberID3", "==", userId))
  ];

  let teamID = null;

  for (const q of teamQueries) {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      teamID = docSnapshot.id;
      break;
    }
  }

  if (!teamID) {
    return null; // No matching team found
  }

  // Step 2: Check the "project" collection for matching teamID
  const projectQuery = query(collection(db, "project"), where("teamID", "==", teamID));
  const projectSnapshot = await getDocs(projectQuery);

  if (!projectSnapshot.empty) {
    const projectDoc = projectSnapshot.docs[0];
    return { id: projectDoc.id, data: projectDoc.data() };
  }

  return null; // No matching project found
};

const ProjectSubmissionForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [caseStudy, setCaseStudy] = useState('');
  const [slideFile, setSlideFile] = useState(null);
  const [ytLink, setYtLink] = useState('');
  const [prototypeLink, setPrototypeLink] = useState('');
  const [fileError, setFileError] = useState(false);
  const [fileName, setFileName] = useState('');
  const [existingProjectId, setExistingProjectId] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return;
      }
      fetchUserData(user.uid).then((userData) => {
        console.log("fetchUserData:", userData);
        if (userData) {
          setExistingProjectId(userData.id);
          setName(userData.data.name || "");
          setDescription(userData.data.description || "");
          setCaseStudy(userData.data.caseStudy || "");
          setYtLink(userData.data.ytLink || "");
          setPrototypeLink(userData.data.prototypeLink || "");
          if (userData.data.slideFileName) {
            setFileName(`File selected: ${userData.data.slideFileName}`);
          }
        }
      });

      const fetchCaseStudies = async () => {
        const caseStudiesCollection = collection(db, "caseStudies");
        const caseStudiesSnapshot = await getDocs(caseStudiesCollection);
        const caseStudiesList = caseStudiesSnapshot.docs
          .map((doc) => ({
            id: doc.data().id, // Use the 'id' field from the document data
            ...doc.data(),
          }))
          .sort((a, b) => a.id - b.id) // Sort by the 'id' field
          .map((caseStudy, index) => ({
            ...caseStudy,
            formattedTitle: `Case Study ${caseStudy.id}: ${caseStudy.title}`, // Use the 'id' field for numbering
          }));
        setCaseStudies(caseStudiesList);
      };

      fetchCaseStudies();
    });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) { // 10MB
      setFileError(true);
      setSlideFile(null);
      setFileName('');
    } else {
      setFileError(false);
      setSlideFile(file);
      setFileName(`File selected: ${file.name}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // let slideFileUrl = '';
      // if (slideFile) {
      //   const storage = getStorage();
      //   const storageRef = ref(storage, `slides/${slideFile.name}`);
      //   await uploadBytes(storageRef, slideFile);
      //   slideFileUrl = await getDownloadURL(storageRef);
      // }

      const projectData = {
        // userId,
        name,
        description,
        caseStudy,
        slideFileName: slideFile ? slideFile.name : '',
        // slideFileUrl,
        ytLink,
        prototypeLink,
        timestamp: new Date()
      };

      if (existingProjectId) {
        // Update existing project
        const projectDocRef = doc(db, "project", existingProjectId);
        await updateDoc(projectDocRef, projectData);
        alert("Project Updated!");
      } else {
        // Add new project
        await addDoc(collection(db, "project"), projectData);
        alert("Project Submitted!");
      }
    } catch (error) {
      console.error("Error adding/updating document: ", error);
      alert("Error submitting project. Please try again.");
    }
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
            <p>Enter your project name *</p>
            <input
              type="text"
              id="project-name"
              name="project-name"
              className="project-submission__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
  onChange={(e) => setCaseStudy(e.target.value)}
  required
>
  <option value="">Select a case study</option>
  {caseStudies.map((caseStudy) => (
    <option key={caseStudy.id} value={caseStudy.id}>
      {caseStudy.formattedTitle}
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
              <p id="slide-file-name" className="project-submission__file-name">{fileName}</p>
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