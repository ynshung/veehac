import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase'; 

const WelcomeMessage = () => {
  
  const [participantName, setParticipantName] = useState('Guest');

  useEffect(() => {
    const fetchParticipantName = async () => {
      
      onAuthStateChanged(auth, async (user) => {
        if (user) { 
          const currUserId = user.uid;
          console.log("userId:", currUserId);
          const participantDoc = await getDoc(doc(db, "participant", currUserId));
          if (participantDoc.exists()) {
            ;
            setParticipantName(participantDoc.data().name);
            console.log("Fetching participant name...", participantDoc.data().name);
          }
        }
      });
    };

    fetchParticipantName();
  }, []);
  
  return (
    <h1 style={{ color: '#000000' }}>
      Welcome, {participantName}!
    </h1>
  );
};

export default WelcomeMessage;

