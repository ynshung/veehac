import '../styles/AdminDashboard.css';
import { useState, useEffect } from 'react';
import AdminAssignment from "./AdminAssignment";
import { fetchProjects, fetchJudges } from "../controller/controller.jsx";

const AdminDashboard = ({ setShowJudging }) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
    };

    fetchData();

  }, []);

  // if (projects[0]) {
  //   console.log(new Date(projects[0].submissionTime.seconds * 1000).toLocaleString())
  //   console.log(typeof projects[0].submissionTime)
  // }
  function checkTime(time) {
    if (time >= new Date(2025, 3, 1, 0, 0, 0, 0)) {
      return false
    }
    else {
      return true
    }

  }
  return (
    <><div className="admin-dashboard-card">
      <div>
        <a href="/">Back to home</a>
      </div>
      <div className="admin-dashboard">
        <div>
          <p style={{ fontSize: '32px', fontWeight: 700 }}>Admin Dashboard</p>
          <hr />
        </div>
        <div className="logged-in-as">
          <p style={{ fontSize: '16px', fontWeight: 600 }}>You are logged in as: <span style={{ fontSize: '16px', fontWeight: 300 }}>admin@veehac.com</span></p>
        </div>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <td>Team Name</td>
              <td>Project Name</td>
              <td>Registration Time</td>
              <td>Submission Time</td>
              <td>Case Study</td>
              <td>Assign Judges</td>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="project-group">{project.group}</td>
                <td style={{ width: "200px" }} className="project-title">{project.title}</td>
                <td className="registration-time">{project.registrationTime}</td>
                <td style={{ width: "200px", textAlign: "left" }}
                  className={`submission-time judged-button ${checkTime(project.submissionTime) ? 'in-time' : 'not-in-time'}`}
                >{new Date(project.submissionTime.seconds * 1000).toLocaleString()}</td>
                <td className="case-study">Case Study {project.caseStudy + 1}</td>
                <td className="project-judged" id="project-judged">
                  {checkTime(project.submissionTime) ? (
                    <AdminAssignment project={project} />
                  ) : (
                    <p>-</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-info">
        <div>
          <p style={{ fontSize: '24px', fontWeight: 600 }}>Admin Info</p>
          <hr />
        </div>
        <div className="admin-details" style={{ fontSize: '15px', fontWeight: 300 }}>
          <p><span style={{ fontWeight: 'bold' }}>Full Name:</span> Eskew Elle</p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Company:</span> Universiti CPlusPlus Malaysia
          </p>
          <p><span style={{ fontWeight: 'bold' }}>Email:</span> eskewelle@database.com</p>
        </div>
      </div>
    </div></>
  );
};

export default AdminDashboard;
