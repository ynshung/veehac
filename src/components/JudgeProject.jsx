import '../styles/JudgeProject.css';
import RatingSlider from './RatingSlider';
import Confirm from './Confirm';
import React, { useEffect, useState } from 'react';

const JudgeProject = ({ projects, setId, id, setProjects, setShowJudging }) => {
  let caseStudies = {
    1: "Web Application",
    2: "Educational Mobile App",
    3: "E-commerce Platform",
  };
  const [ideaImpact, setIdeaImpact] = useState(0);
  const [uniqueness, setUniqueness] = useState(0);
  const [business, setBusiness] = useState(0);
  const [design, setDesign] = useState(0);
  const [pitching, setPitching] = useState(0);
  const [description, setDescription] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("project" + id)) {
      const tempProject = JSON.parse(localStorage.getItem("project" + id));
      console.log(tempProject);
      setIdeaImpact(tempProject.ideaImpact);
      setUniqueness(tempProject.uniqueness);
      setBusiness(tempProject.business);
      setDesign(tempProject.design);
      setPitching(tempProject.pitching);
      setDescription(tempProject.judgeDescription);
    }
  }, []);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = (confirmed) => {
    // set local storage
    const tempProject = {
      ideaImpact: ideaImpact,
      uniqueness: uniqueness,
      business: business,
      design: design,
      pitching: pitching,
      judgeDescription: description,
    }
    console.log(tempProject)
    localStorage.setItem("project" + id, JSON.stringify(tempProject));
    setShowJudging('');  // Close the dialog
  };

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
          <RatingSlider handleChangeRating={setIdeaImpact} id={id} rating={ideaImpact} />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Idea Novelty/ Uniqueness</p>
          <RatingSlider handleChangeRating={setUniqueness} id={id} rating={uniqueness} />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Business</p>
          <RatingSlider handleChangeRating={setBusiness} id={id} rating={business} />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Prototype UI Design</p>
          <RatingSlider handleChangeRating={setDesign} id={id} rating={design} />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Pitching</p>
          <RatingSlider handleChangeRating={setPitching} id={id} rating={pitching} />
        </div>

        <div className="project-comments">
          <p>Description</p>
          <textarea value={description} style={{ height: '200px' }} onChange={(e) => setDescription(e.target.value)}></textarea>
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