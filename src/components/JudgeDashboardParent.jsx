import { useState } from "react";
import JudgeDashboard from "./JudgeDashboard";
import JudgeProject from "./JudgeProject";

function JudgeDashboardParent() {
  const [showJudging, setShowJudging] = useState('');
  return (
    <div>
      {showJudging !== '' ? (
        <JudgeProject class="judge-project" setShowJudging={setShowJudging} />
      ) : (
        <JudgeDashboard setShowJudging={setShowJudging} />
      )}
    </div>
  );
}
export default JudgeDashboardParent;
