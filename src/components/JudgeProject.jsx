import '../styles/JudgeProject.css';
import RatingSlider from './RatingSlider';

const JudgeProject = ({ setShowJudging }) => {
  const projects = [
    {
      id: 1,
      name: "Project 1",
      group: "Then Sherf Low",
      title: "Tik Tok Tutorial with AI",
      judged: true,
    },
    {
      id: 2,
      name: "Project 2",
      group: "Jarver Skrip",
      title: "Smart Energy Management",
      judged: false,
    },
    {
      id: 3,
      name: "Project 3",
      group: "Viewjay Ash",
      title: "Automated Judging System",
      judged: false,
    },
  ];

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
              <textarea disabled style={{ height: '30px' }}>spolskfdnfmfdnbfg</textarea>
            </div>
            <div className="project-description">
              <p>Description</p>
              <textarea disabled style={{ height: '300px' }}>spolskfdnfmfdnbfg </textarea>
            </div>
            <div className="project-case-study">
              <p>Case Study</p>
              <textarea disabled style={{ height: '30px' }}>spolskfdnfmfdnbfg</textarea>
            </div>
            <div className="project-presentation-video">
              <p>Presentation Video</p>
              <iframe
                width="100%"
                height="365"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
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
          <div className="submit">
            <p>Submit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeProject;