import '../styles/JudgeProject.css';
import RatingSlider from './RatingSlider';

const JudgeProject = ({ projects, setId, id, setShowJudging }) => {
  console.log(projects[id-1]["ytLink"]);
  let caseStudies = {
    1: "Web Application",
    2: "Educational Mobile App",
    3: "E-commerce Platform",
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
              <textarea value={projects[id-1]["title"]} disabled style={{ height: '30px' }}></textarea>
            </div>
            <div className="project-description">
              <p>Description</p>
              <textarea value={projects[id-1]["description"]} disabled style={{ height: '300px' }}> </textarea>
            </div>
            <div className="project-case-study">
              <p>Case Study</p>
              <textarea value={"Case Study " + projects[id-1]["caseStudy"] + ": " + caseStudies[projects[id-1]["caseStudy"]]} disabled style={{ height: '30px' }}></textarea>
            </div>
            <div className="project-presentation-video">
              <p>Presentation Video</p>
              <iframe
                width="100%"
                height="365"
                src={projects[id-1]["ytLink"].replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")}
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
          <RatingSlider />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Idea Novelty/ Uniqueness</p>
          <RatingSlider />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Business</p>
          <RatingSlider />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Prototype UI Design</p>
          <RatingSlider />
        </div>
        <div className="judge-rating-slider">
          <p style={{ fontSize: '16px', fontWeight: 500 }}>Pitching</p>
          <RatingSlider />
        </div>

        <div className="project-comments">
          <p>Description</p>
          <textarea style={{ height: '200px' }}></textarea>
        </div>
        <div>
          <div onClick={() => setShowJudging('')} className="submit">
            <p>Submit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeProject;