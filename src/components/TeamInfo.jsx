import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc, arrayRemove, updateDoc, arrayUnion, addDoc, deleteDoc } from "firebase/firestore";
import "../styles/TeamInfo.css";
import { onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2'

const TeamInfo = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leaderName, setLeaderName] = useState('');
  const [participants, setParticipants] = useState({});
  const [isLeader, setIsLeader] = useState(false);

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
        query(collection(db, "team"), where("membersID", "array-contains", userId)),
      ];

      let teamData = null;
      for (const q of queries) {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          teamData = querySnapshot.docs[0].data();
          teamData.id = querySnapshot.docs[0].id; // Save the document ID
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
          setIsLeader(teamData.leaderID === userId);
        }

        const participantsData = {};
        for (const id of teamData.membersID) {
          if (id) {
            const participantDoc = await getDoc(doc(db, "participant", id));
            if (participantDoc.exists()) {
              const participantData = participantDoc.data();
              participantsData[id] = participantData.name; // Access the "name" field inside the document

              if (id === userId) {
                if (participantData.teamID !== teamData.id) {
                  console.log("Updating teamID for user:", userId);
                  updateDoc(doc(db, "participant", userId), {
                    teamID: teamData.id,
                  }).then(() => {
                    location.reload();
                  });
                }
              }
            }
          }
        }
        setParticipants(participantsData);
      } else {
        console.log("No data found for userID:", userId);
        getDoc(doc(db, "participant", userId)).then((docSnap) => {
          if (docSnap.exists() && docSnap.data().teamID) {
            updateDoc(doc(db, "participant", userId), {
              teamID: "",
            }).then(() => {
              location.reload();
            });
          }
        });
      }
      setLoading(false); // Set loading to false after data is fetched
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Render loading state while fetching data
  }

  return (
    <div className="team-info__body">
      <label htmlFor="case-study" className="team-info__full-width-underline">
        Team Info:
      </label>
      <div className="team-info__rectangle-container">
        <div className="team-info__rectangle">
          {team ? (
            <>
              <h2 style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                Team {team.teamName}
              </h2>
              <p style={{ fontWeight: "bold" }}>Leader: {leaderName}</p>
              <div className="member-list">
                {Object.entries(participants).map(([id, name]) => (
                  <div key={id} className="member-list__item">
                    <p>Participant: {name}</p>
                    {isLeader && (
                      <button
                        className="button-sm"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, remove it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              console.log(
                                "Removing member with ID:",
                                id,
                                team.id,
                              );
                              updateDoc(doc(db, "team", team.id), {
                                membersID: arrayRemove(id),
                              })
                                .then(() => {
                                  Swal.fire(
                                    "Removed!",
                                    "The member has been removed.",
                                    "success",
                                  );
                                  fetchData();
                                })
                                .catch((error) => {
                                  Swal.fire("Error!", error.message, "error");
                                });
                            }
                          });
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isLeader && team.membersID.length < 3 && (
                <div className="button-container">
                  <button
                    className="button"
                    onClick={() => {
                      Swal.fire({
                        title: "Add Members",
                        input: "text",
                        inputLabel: "Participant ID",
                        inputPlaceholder: "Enter the participant ID",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Add",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          const newMemberID = result.value;
                          if (
                            team.membersID.includes(newMemberID) ||
                            team.leaderID === newMemberID
                          ) {
                            Swal.fire(
                              "Error!",
                              "Participant already exists in the team.",
                              "error",
                            );
                            return;
                          }

                          // Check if user exists
                          getDoc(doc(db, "participant", newMemberID)).then(
                            (docSnap) => {
                              if (docSnap.exists()) {
                                updateDoc(doc(db, "team", team.id), {
                                  membersID: arrayUnion(newMemberID),
                                })
                                  .then(() => {
                                    Swal.fire(
                                      "Added!",
                                      "The member has been added.",
                                      "success",
                                    );
                                    fetchData();
                                  })
                                  .catch((error) => {
                                    Swal.fire("Error!", error.message, "error");
                                  });
                              } else {
                                Swal.fire(
                                  "Error!",
                                  "Participant does not exist.",
                                  "error",
                                );
                              }
                            },
                          );
                        }
                      });
                    }}
                  >
                    <i className="fa-solid fa-plus"></i> Add Members
                  </button>
                  {team.membersID.length === 0 && <button
                    className="button"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteDoc(doc(db, "team", team.id))
                            .then(() => {
                              // Update teamID in the participant document
                              updateDoc(doc(db, "participant", team.leaderID), {
                                teamID: "",
                              }).then(() => {
                                Swal.fire(
                                  "Deleted!",
                                  "Your team has been deleted.",
                                  "success",
                                );
                                location.reload();
                              });
                            })
                            .catch((error) => {
                              Swal.fire("Error!", error.message, "error");
                            });
                        }
                      });
                    }}
                  >
                    <i className="fa-solid fa-trash"></i> Delete Team
                  </button>}
                </div>
              )}
            </>
          ) : (
            <p>No team data available</p>
          )}
          {!team && (
            <div className="button-container">
              <button
                className="button"
                onClick={() => {
                  Swal.fire({
                    title: "Create Team",
                    input: "text",
                    inputLabel: "Team Name",
                    inputPlaceholder: "Enter the team name",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Create",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const teamName = result.value;
                      const userId = auth.currentUser.uid;
                      const newTeam = {
                        teamName: teamName,
                        leaderID: userId,
                        membersID: [],
                        details: "",
                        creationDate: new Date(),
                      };

                      // Add new team to the "team" collection
                      addDoc(collection(db, "team"), newTeam)
                        .then((docRef) => {
                          // Update teamID in the participant document
                          updateDoc(doc(db, "participant", userId), {
                            teamID: docRef.id,
                          }).then(() => {
                            Swal.fire(
                              "Created!",
                              "Your team has been created.",
                              "success",
                            );
                            location.reload();
                          });
                        });
                    }
                  });
                }}
              >
                <i className="fa-solid fa-plus"></i> Create Team
              </button>
              <button
                className="button"
                onClick={() => {
                  navigator.clipboard.writeText(auth.currentUser.uid);
                  Swal.fire(
                    "Copied!",
                    `Send the user ID to your team leader to add you in the team. Your user ID is: ${auth.currentUser.uid}`,
                    "success",
                  );
                }}
              >
                <i className="fa-solid fa-copy"></i> Copy User ID
              </button>
            </div>
          )}
        </div>
        <div className="team-info__rectangle team-info__details-container">
          <h4 style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            Team Details
          </h4>
          <div className="team-info__details">{team ? team.details : ""}</div>
          {isLeader && (
            <div className="button-container">
              <button
                className="button"
                onClick={() => {
                  Swal.fire({
                    title: "Edit Team Name",
                    input: "text",
                    inputLabel: "Team Name",
                    inputPlaceholder: "Enter the team name",
                    inputValue: team.teamName,
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Save",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const newName = result.value;
                      updateDoc(doc(db, "team", team.id), {
                        teamName: newName,
                      })
                        .then(() => {
                          Swal.fire(
                            "Saved!",
                            "The team name has been updated.",
                            "success",
                          );
                          fetchData();
                        })
                        .catch((error) => {
                          Swal.fire("Error!", error.message, "error");
                        });
                    }
                  });
                }}
              >
                <i className="fa-solid fa-edit"></i> Edit Team Name
              </button>
              <button
                className="button"
                onClick={() => {
                  Swal.fire({
                    title: "Edit Details",
                    input: "textarea",
                    inputLabel: "Team Details",
                    inputPlaceholder: "Enter the team details",
                    inputValue: team.details,
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Save",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const newDetails = result.value;
                      updateDoc(doc(db, "team", team.id), {
                        details: newDetails,
                      })
                        .then(() => {
                          Swal.fire(
                            "Saved!",
                            "The details have been updated.",
                            "success",
                          );
                          fetchData();
                        })
                        .catch((error) => {
                          Swal.fire("Error!", error.message, "error");
                        });
                    }
                  });
                }}
              >
                <i className="fa-solid fa-edit"></i> Edit Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;