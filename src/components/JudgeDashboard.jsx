import { useEffect, useState } from "react";
import "../styles/JudgeDashboard.css";

const JudgeDashboard = ({ projects, setId, setShowJudging }) => {
  return (
    <div className="judge-dashboard-card">
      <div>
        <a href="/">Back to home</a>
      </div>
      <div className="judge-dashboard">
        <div>
          <p style={{ fontSize: "32px", fontWeight: 700 }}>Judge Dashboard</p>
          <hr />
        </div>
        <div>
          <div>
            <p style={{ fontSize: "15px", fontWeight: 400 }}>
              Welcome to Veehac 2025, glad to have you here with us! The
              judging times will be from 2nd January 2025 to 3rd January 2025.
            </p>
          </div>
        </div>
      </div>
      <div className="start-judging">
        <div>
          <p style={{ fontSize: "24px", fontWeight: 600 }}>Start Judging</p>
          <hr />
        </div>
        <div style={{ fontSize: "13px", fontWeight: 200 }}>
          <p>Red Icon: Pending Evaluation</p>
          <p>Green Icon: Completed Evaluation</p>
        </div>
      </div>
      <div className="still-make-changes">
        <div>
          <p>You can still make changes until the judging deadline</p>
        </div>
      </div>
      <div>
        <table style={{ width: "100%" }}>
          <tbody>
            {projects.map((project) => {
              const [judged, setJudged] = useState(false);
              useEffect(() => {
                if (localStorage.getItem("project" + project.id)) {
                  setJudged(true);
                }
              }, []);
              return (
                <tr key={project.id}>
                  <td className="project-name">{project.name}</td>
                  <td className="project-group">{project.group}</td>
                  <td className="project-title">{project.title}</td>
                  <td className="project-judged" id="project-judged">
                    <a
                      className={`judged-button ${judged ? "judged" : "not-judged"}`}
                      onClick={() => {
                        setShowJudging(project.id); // This updates the showJudging state in the parent
                        console.log(project.id, "ID")
                        setId(project.id); // This updates the id in the parent
                      }}
                    >
                      <i className="fa fa-file-text" aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="judge-info">
        <div>
          <p style={{ fontSize: "24px", fontWeight: 600 }}>Judge Info</p>
          <hr />
        </div>
        <div
          className="judge-details"
          style={{ fontSize: "15px", fontWeight: 300 }}
        >
          <p>
            <span style={{ fontWeight: "bold" }}>Full Name:</span> Eskew Elle
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Company:</span> Universiti
            CPlusPlus Malaysia
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
            eskewelle@database.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default JudgeDashboard;
