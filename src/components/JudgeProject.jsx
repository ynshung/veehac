import '../styles/JudgeProject.css';
import RatingSlider from './RatingSlider';
import Confirm from './Confirm';
import React, { useState } from 'react';

const JudgeProject = ({ projects, setId, id, setProjects, setShowJudging }) => {
  let caseStudies = {
    1: "Web Application",
    2: "Educational Mobile App",
    3: "E-commerce Platform",
  };
  const [description, setDescription] = useState(projects[id - 1]["judgeDescription"]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [result, setResult,] = useState(null);
  const [tempResults, setTempResults] = useState({
    ideaImpact: null,
    uniqueness: null,
    business: null,
    design: null,
    pitching: null,
    judgeDescription: projects[id - 1]["judgeDescription"],
  });

  const handleChangeRating = (category, newRating) => {
    setTempResults((prevResults) => ({
      ...prevResults,
      [category]: newRating, // Dynamically update the specific category's value
    }));
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = (confirmed) => {
    setResult(confirmed);
    if (confirmed === true) {
      const updatedProjects = projects.map((project) => {
        const updatedProject = { ...project };
        console.log(project.id)
        console.log(id)
        if (project.id === id) {
          Object.keys(tempResults).forEach((key) => {
            if (tempResults[key] !== null && tempResults[key] !== "") {
              updatedProject[key] = tempResults[key];
            }
          });
        }
        return updatedProject;
      });
      console.log(updatedProjects);
      console.log(projects);
      setProjects(updatedProjects);
      setShowJudging('');  // Close the dialog
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    // Update the judgeDescription in tempResults state
    setTempResults((prevResults) => ({
      ...prevResults,
      judgeDescription: value, // Update the judgeDescription with the new value
    }));
  };
  console.log(tempResults)
  return (
    <div style={{ display: 'inline-flex' }}>
      <div className="judge-project-card">
        <div style={{ fontSize: '13px', fontWeight: 500 }}>
          <a onClick={() => setShowJudging('')}>Back to Dashboard</a>
          <p><span style={{ fontWeight: 200 }}>Dashboard/</span>Project Information</p>
          <hr />
        </div>

        <div>
          <div className="project-information">
            <p style={{ fontSize: '24px', fontWeight: 600 }}>Project Information</p>
          </div>

          <div className="project-title">
            <div>
              <p>Project Title</p>
              <textarea value={projects[id - 1]["title"]} disabled style={{ height: '30px' }}></textarea>
            </div>
            <div className="project-description">
              <p>Description</p>
              <textarea value={projects[id - 1]["description"]} disabled style={{ height: '300px' }}> </textarea>
            </div>
            <div className="project-case-study">
              <p>Case Study</p>
              <textarea value={"Case Study " + projects[id - 1]["caseStudy"] + ": " + caseStudies[projects[id - 1]["caseStudy"]]} disabled style={{ height: '30px' }}></textarea>
            </div>
            <div className="project-presentation-video">
              <p>Presentation Video</p>
              <iframe
                width="100%"
                height="365"
                src={projects[id - 1]["ytLink"].replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")}
              >
              </iframe>
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
          <p style={{ fontSize: '24px', fontWeight: 600 }}>Judging</p>
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Idea Impact</p>
          <RatingSlider tempResults={tempResults} handleChangeRating={handleChangeRating} id={id} category={"ideaImpact"} rating={projects[id - 1]["ideaImpact"]} />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Idea Novelty/ Uniqueness</p>
          <RatingSlider tempResults={tempResults} handleChangeRating={handleChangeRating} id={id} category={"uniqueness"} rating={projects[id - 1]["uniqueness"]} />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Business</p>
          <RatingSlider tempResults={tempResults} handleChangeRating={handleChangeRating} id={id} category={"business"} rating={projects[id - 1]["business"]} />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Prototype UI Design</p>
          <RatingSlider tempResults={tempResults} handleChangeRating={handleChangeRating} id={id} category={"design"} rating={projects[id - 1]["design"]} />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Pitching</p>
          <RatingSlider tempResults={tempResults} handleChangeRating={handleChangeRating} id={id} category={"pitching"} rating={projects[id - 1]["pitching"]} />
        </div>

        <div className="project-comments">
          <p>Description</p>
          <textarea value={tempResults.judgeDescription} onChange={handleChange} style={{ height: '200px' }}></textarea>
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