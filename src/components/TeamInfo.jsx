import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import "../styles/TeamInfo.css";
import { onAuthStateChanged } from 'firebase/auth';

const TeamInfo = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leaderName, setLeaderName] = useState('');
  const [participants, setParticipants] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      console.log("Component mounted");

      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          return;
        }

        const userId = user.uid; // Use the user ID from the auth state

        // Perform multiple queries to cover all conditions
        const queries = [
          query(collection(db, "team"), where("leaderID", "==", userId)),
          query(collection(db, "team"), where("memberID1", "==", userId)),
          query(collection(db, "team"), where("memberID2", "==", userId)),
          query(collection(db, "team"), where("memberID3", "==", userId)),
        ];

        let teamData = null;
        for (const q of queries) {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            teamData = querySnapshot.docs[0].data();
            break; // Exit the loop once we find a matching document
          }
        }

        if (teamData) {
          console.log("Data fetched:", teamData);
          setTeam(teamData);

          // Fetch leader name
          const leaderDoc = await getDoc(
            doc(db, "participant", teamData.leaderID),
          );
          if (leaderDoc.exists()) {
            setLeaderName(leaderDoc.data().name);
          }

          // Fetch participant names
          const participantIDs = [
            teamData.memberID1,
            teamData.memberID2,
            teamData.memberID3,
          ];
          const participantsData = {};
          for (const id of participantIDs) {
            if (id) {
              const participantDoc = await getDoc(doc(db, "participant", id));
              if (participantDoc.exists()) {
                const participantData = participantDoc.data();
                participantsData[id] = participantData.name; // Access the "name" field inside the document
              }
            }
          }
          setParticipants(participantsData);
        } else {
          console.log("No data found for userID:", userId);
        }
        setLoading(false); // Set loading to false after data is fetched
      });
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Render loading state while fetching data
  }

  return (
    <div className="team-info__body">
      <label htmlFor="case-study" className="team-info__full-width-underline">Team Info:</label>
      <div className="team-info__rectangle-container">
        <div className="team-info__rectangle">
          {team ? (
            <>
              <h2 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>Team {team.teamName}</h2>
              <p style={{ fontWeight: 'bold' }}>Leader: {leaderName}</p>
              {[team.memberID1, team.memberID2, team.memberID3].map((memberID, idx) => (
                memberID && participants[memberID] ? (
                  <div key={idx}>
                    <p>
                      Member {idx + 1}: {participants[memberID]}
                    </p>
                  </div>
                ) : null
              ))}
            </>
          ) : (
            <p>No team data available</p>
          )}
        </div>
        <div className="team-info__rectangle">{team ? team.details : ''}</div>
      </div>
    </div>
  );
};

export default TeamInfo;