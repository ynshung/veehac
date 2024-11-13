import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminAssignment from "./AdminAssignment";

function AdminParent() {
  const [showAssignment, setShowAssignment] = useState('');
  return (
    <div>
      {showAssignment !== '' ? (
        <AdminAssignment class="judge-project" setShowAssignment={setShowAssignment} />
      ) : (
        <AdminDashboard setShowAssignment={setShowAssignment} />
      )}
    </div>
  );
}
export default AdminParent;
