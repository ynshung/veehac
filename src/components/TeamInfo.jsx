import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import "../styles/TeamInfo.css";

const TeamInfo = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Component mounted");
      const leaderID = 7; // Replace with actual leaderID
      console.log("Fetching data for leaderID:", leaderID);
      const q = query(collection(db, "team"), where("leaderID", "==", leaderID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        console.log("Data fetched:", doc.data());
        setTeam(doc.data());
      } else {
        console.log("No data found for leaderID:", leaderID);
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Render loading state while fetching data
  }

  return (
    <div className="body">
      <label htmlFor="case-study" className="full-width-underline">Team Info:</label>
      <div className="rectangle-container">
        <div className="rectangle">
          {team ? (
            <>
              <h2 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>Team {team.teamName}</h2>
              <p style={{ fontWeight: 'bold' }}>Leader: {team.leaderID}</p>
              {[team.memberID1, team.memberID2, team.memberID3].map((memberID, idx) => (
                memberID ? (
                  <div key={idx}>
                    <p>
                      Member {idx + 1}: {memberID}
                    </p>
                  </div>
                ) : null
              ))}
            </>
          ) : (
            <p>No team data available</p>
          )}
        </div>
        <div className="rectangle">{team ? team.details : ''}</div>
      </div>
    </div>
  );
};

export default TeamInfo;