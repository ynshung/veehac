import "../styles/JudgeProject.css";
import RatingSlider from "./RatingSlider";
import Confirm from "./Confirm";
import React, { useEffect, useState } from "react";
import { db } from "/src/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  fetchProjects,
  fetchCaseStudies,
  calculateSentiment,
} from "../controller/controller.jsx";
import CaseStudies from "./CaseStudies.astro";

const JudgeProject = ({
  projects,
  setId,
  id,
  setProjects,
  caseStudies,
  setShowJudging,
}) => {
  // State for storing case studies and loading state

  const [isLoading, setIsLoading] = useState(true); // State to track loading

  projects = projects.sort((a, b) => a.id - b.id);
  console.log(projects, id, "projects");
  const [ideaImpact, setIdeaImpact] = useState(0);
  const [uniqueness, setUniqueness] = useState(0);
  const [business, setBusiness] = useState(0);
  const [design, setDesign] = useState(0);
  const [pitching, setPitching] = useState(0);
  const [description, setDescription] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setIdeaImpact(projects[id].ideaImpact);
    setUniqueness(projects[id].uniqueness);
    setBusiness(projects[id].business);
    setDesign(projects[id].design);
    setPitching(projects[id].pitching);
    setDescription(projects[id].judgeDescription);
  }, []);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = async (confirmed) => {
    // Example usage:
    const CalculateSentiment = new calculateSentiment();
    let x = "";
    CalculateSentiment.sendMessage(description)
      .then((responseData) => {
        x =
          Math.round(
            (5 + responseData["pos"] * 5 - responseData["neg"] * 5) * 100,
          ) / 100;
        console.log(x);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch operation
        console.error("Error in sentiment analysis:", error);
      });

    const tempProject = {
      ideaImpact: parseInt(ideaImpact),
      uniqueness: parseInt(uniqueness),
      business: parseInt(business),
      design: parseInt(design),
      pitching: parseInt(pitching),
      judgeDescription: description,
      judged: true,
    };
    console.log(tempProject);

    const q = query(collection(db, "project"), where("id", "==", id));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(db, "project", querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          ...tempProject,
        });
        console.log("Document successfully updated!");
      } else {
        console.log("No project found with the given ID");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    const fetchData = async () => {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
    };
    await fetchData();

    setShowJudging(""); // Close the dialog
  };

  return (
    <div style={{ display: "inline-flex" }}>
      <div className="judge-project-card">
        <div style={{ fontSize: "13px", fontWeight: 500 }}>
          <a onClick={() => setShowJudging("")}>Back to Dashboard</a>
          <p>
            <span style={{ fontWeight: 200 }}>Dashboard/</span>Project
            Information
          </p>
          <hr />
        </div>

        <div>
          <div className="project-information">
            <p style={{ fontSize: "24px", fontWeight: 600 }}>
              Project Information
            </p>
          </div>

          <div className="project-title">
            <div>
              <p>Project Title</p>
              <textarea
                value={projects[id]["title"]}
                disabled
                style={{ height: "30px" }}
              ></textarea>
            </div>
            <div className="project-description">
              <p>Description</p>
              <textarea
                value={projects[id]["description"]}
                disabled
                style={{ height: "300px" }}
              >
                {" "}
              </textarea>
            </div>
            <div className="project-case-study">
              <p>Case Study</p>
              <textarea
                value={
                  "Case Study " +
                  (parseInt(projects[id]["caseStudy"]) + 1) +
                  ": " +
                  caseStudies[projects[id]["caseStudy"]].title
                }
                disabled
                style={{ height: "30px" }}
              ></textarea>
            </div>
            <div className="project-presentation-video">
              <p>Presentation Video</p>
              <iframe
                width="100%"
                height="365"
                src={projects[id]["ytLink"].replace(
                  "https://www.youtube.com/watch?v=",
                  "https://www.youtube.com/embed/",
                )}
              ></iframe>
            </div>
            <div className="project-prototype">
              <div className="go-to-prototype">
                <p>Go to Prototype</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="judge-rating-card">
        <div>
          <p style={{ fontSize: "24px", fontWeight: 600 }}>Judging</p>
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: "16px", fontWeight: 500 }}>Idea Impact</p>
          <RatingSlider
            handleChangeRating={setIdeaImpact}
            id={id}
            rating={ideaImpact}
          />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: "16px", fontWeight: 500 }}>
            Idea Novelty/ Uniqueness
          </p>
          <RatingSlider
            handleChangeRating={setUniqueness}
            id={id}
            rating={uniqueness}
          />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: "16px", fontWeight: 500 }}>Business</p>
          <RatingSlider
            handleChangeRating={setBusiness}
            id={id}
            rating={business}
          />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: "16px", fontWeight: 500 }}>
            Prototype UI Design
          </p>
          <RatingSlider
            handleChangeRating={setDesign}
            id={id}
            rating={design}
          />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: "16px", fontWeight: 500 }}>Pitching</p>
          <RatingSlider
            handleChangeRating={setPitching}
            id={id}
            rating={pitching}
          />
        </div>

        <div className="project-comments">
          <p>Description</p>
          <textarea
            value={description}
            style={{ height: "200px" }}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <div onClick={handleOpenDialog} className="submit">
            <p>Submit</p>
          </div>
          <Confirm
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default JudgeProject;
