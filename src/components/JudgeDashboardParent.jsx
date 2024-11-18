import { useState, useEffect } from 'react';
import JudgeDashboard from "./JudgeDashboard";
import JudgeProject from "./JudgeProject";
const projects = [
  {
    id: 1,
    name: "Project 1",
    group: "Then Sherf Low",
    title: "Tik Tok Tutorial with AI",
    judged: true,
    description: "Have you ever felt like a plastic bag???",
    caseStudy: 1,
    ytLink: "https://www.youtube.com/watch?v=lQlIhraqL7o",
    prototypeLink: "https://www.youtube.com/watch?v=52_WpTEdMjY"
  },
  {
    id: 2,
    name: "Project 2",
    group: "Jarver Skrip",
    title: "Smart Energy Management",
    judged: false,
    description: "Have you ever felt like a skibidi ohio???",
    caseStudy: 2,
    ytLink: "https://www.youtube.com/watch?v=lQlIhraqL7o",
    prototypeLink: "https://www.youtube.com/watch?v=52_WpTEdMjY"
  },
  {
    id: 3,
    name: "Project 3",
    group: "Viewjay Ash",
    title: "Automated Judging System",
    judged: false,
    description: "Have you ever felt like a sigma gyattt???",
    caseStudy: 3,
    ytLink: "https://www.youtube.com/watch?v=lQlIhraqL7o",
    prototypeLink: "https://www.youtube.com/watch?v=52_WpTEdMjY"
  },

];
function JudgeDashboardParent() {
  const [showJudging, setShowJudging] = useState('');
  const [id, setId] = useState(null);
  const [isIdSet, setIsIdSet] = useState(false)
  // const [isIdSet, setIsIdSet] = useState(false);
  useEffect(() => {
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
