import '../styles/AdminDashboard.css';
import AdminAssignment from "./AdminAssignment";
const AdminDashboard = ({ setShowJudging }) => {
  const projects = [
    {
      id: 1,
      name: "Project 1",
      group: "Then Sherf Low",
      title: "Tik Tok Tutorial with AI",
      registrationTime: new Date(2024, 1, 20, 23, 15, 34, 0),
      submissionTime: new Date(2024, 11, 10, 23, 15, 34, 0),
      caseStudy: 1,
      judged: true,
    },
    {
      id: 2,
      name: "Project 2",
      group: "Jarver Skrip",
      title: "Smart Energy Management",
      registrationTime: new Date(2025, 1, 10, 23, 12, 34, 0),
      submissionTime: new Date(2025, 3, 1, 12, 15, 3, 0),
      caseStudy: 4,
      judged: false,
    },
    {
      id: 3,
      name: "Project 3",
      group: "Viewjay Ash",
      title: "Automated Judging System",
      registrationTime: new Date(2025, 1, 10, 23, 12, 34, 0),
      submissionTime: new Date(2025, 2, 10, 21, 13, 12, 0),
      caseStudy: 3,
      judged: false,
    },
  ];

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
        <a href="#">Back to home</a>
      </div>
      <div className="admin-dashboard">
        <div>
          <p style={{ fontSize: '32px', fontWeight: 700 }}>Admin Dashboard</p>
          <hr />
        </div>
        <div className="logged-in-as">
          <p style={{ fontSize: '16px', fontWeight: 600 }}>You are logged in as: <span style={{ fontSize: '16px', fontWeight: 300 }}>skibidi@toilet.com</span></p>
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
                <td className="registration-time">{project.registrationTime.toLocaleString()}</td>
                <td style={{ width: "200px", textAlign: "left" }}
                  className={`submission-time judged-button ${checkTime(project.submissionTime) ? 'in-time' : 'not-in-time'}`}
                >{project.submissionTime.toLocaleString()}</td>
                <td className="case-study">Case Study {project.caseStudy}</td>
                <td className="project-judged" id="project-judged">
                {checkTime(project.submissionTime) ? (
       <AdminAssignment />
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
          <p style={{ fontSize: '24px', fontWeight: 600 }}>Judge Info</p>
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
