import { useState, useEffect } from 'react';
import JudgeDashboard from "./JudgeDashboard";
import JudgeProject from "./JudgeProject";

function JudgeDashboardParent() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project 1",
      group: "Then Sherf Low",
      title: "Tik Tok Tutorial with AI",
      judged: true,
      description: "Have you ever felt like a plastic bag???",
      caseStudy: 1,
      ytLink: "https://www.youtube.com/watch?v=lkVjUj8cyHQ",
      prototypeLink: "https://www.youtube.com/watch?v=52_WpTEdMjY",
      ideaImpact: 5,
      uniqueness: 3,
      business: 7,
      design: 4,
      pitching: 7,
      judgeDescription: "Erm What the skibidi???",
    },
    {
      id: 2,
      name: "Project 2",
      group: "Jarver Skrip",
      title: "Smart Energy Management",
      judged: false,
      description: "Have you ever felt like a skibidi ohio???",
      caseStudy: 2,
      ytLink: "https://www.youtube.com/watch?v=8uFD64z5A6U",
      prototypeLink: "https://www.youtube.com/watch?v=lkVjUj8cyHQ",
      ideaImpact: 0,
      uniqueness: 0,
      business: 0,
      design: 0,
      pitching: 0,
      judgeDescription: "",
    },
    {
      id: 3,
      name: "Project 3",
      group: "Viewjay Ash",
      title: "Automated Judging System",
      judged: false,
      description: "Have you ever felt like a sigma gyattt???",
      caseStudy: 3,
      ytLink: "https://www.youtube.com/watch?v=QVYCKN7FQx4",
      prototypeLink: "https://www.youtube.com/watch?v=52_WpTEdMjY",
      ideaImpact: 0,
      uniqueness: 0,
      business: 0,
      design: 0,
      pitching: 0,
      judgeDescription: "",
    },]
  );
  const [showJudging, setShowJudging] = useState('');
  const [id, setId] = useState(null);
  const [isIdSet, setIsIdSet] = useState(false)
  // const [isIdSet, setIsIdSet] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("role") !== "judge") {
      window.location.href = "/";
    }

    if (id !== null) {
      console.log("@PIOAEFER", id)
      setIsIdSet(true);
    }
  }, [id]);
  return (
    <div>
      {showJudging !== '' && isIdSet ? (
        <JudgeProject
          projects={projects}
          setId={setId}
          className="judge-project"
          setProjects={setProjects}
          setShowJudging={setShowJudging}
          id={id} // Pass selectedId as a prop
        />
      ) : (
        <JudgeDashboard
          projects={projects}
          setId={setId}
          setShowJudging={setShowJudging}
          id={id} // Pass selectedId as a prop
        />
      )}
    </div>
  );
}
export default JudgeDashboardParent;
