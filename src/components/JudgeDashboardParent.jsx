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
      description: "The methodology focuses on utilizing AI-driven tools to enhance content creation and engagement. The tutorial begins by introducing viewers to various AI-powered apps and platforms designed for video editing, voice synthesis, and creative effects. Step-by-step instructions demonstrate how to integrate AI features, such as automated captioning, real-time object recognition, and personalized content recommendations, into short-form videos. The tutorial also emphasizes optimizing AI suggestions to align with trending topics, using data-driven insights to boost visibility. Throughout the tutorial, viewers are encouraged to experiment with AI tools to personalize their videos and enhance the overall viewer experience, making the process both educational and interactive.",
      caseStudy: 1,
      ytLink: "https://www.youtube.com/watch?v=lkVjUj8cyHQ",
      prototypeLink: "https://www.youtube.com/watch?v=52_WpTEdMjY",
      ideaImpact: 5,
      uniqueness: 3,
      business: 7,
      design: 4,
      pitching: 7,
      judgeDescription: "Amazing",
    },
    {
      id: 2,
      name: "Project 2",
      group: "Jarver Skrip",
      title: "Smart Energy Management",
      judged: false,
      description: "Smart Energy Management refers to the use of advanced technologies, data analytics, and automation to optimize the production, distribution, and consumption of energy in a way that reduces waste, enhances efficiency, and lowers costs. It involves integrating smart meters, sensors, and energy management software to monitor real-time energy usage in homes, buildings, and industrial facilities. Through data analysis, energy consumption patterns are identified, enabling the implementation of strategies such as demand response, load shifting, and predictive maintenance. Smart grids and renewable energy sources can be seamlessly incorporated, allowing for better integration of solar, wind, and other sustainable energy sources into the grid. Overall, smart energy management aims to reduce carbon footprints, improve operational efficiency, and provide cost savings while supporting sustainable energy practices.",
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
      description: "The Automated Judging System is a technology-driven solution designed to evaluate and score submissions or performances in various contexts, such as competitions, exams, or assessments, without human intervention. These systems typically use algorithms, machine learning, and artificial intelligence to analyze data inputs, such as written text, images, videos, or performance metrics, and provide consistent, objective, and quick evaluations. For example, in coding competitions, an automated judging system can assess the correctness and efficiency of code submissions, while in art or design competitions, it may evaluate creativity based on predefined criteria. The system works by comparing submissions against a set of predefined rules, standards, or databases and can offer instant feedback, ranking, or scoring. This technology enhances fairness by reducing human biases, increases efficiency by handling large volumes of entries, and provides transparency in the judging process.",
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
