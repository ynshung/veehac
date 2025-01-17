import CaseStudies from '../components/CaseStudies.astro';
import { loginTimePeriod } from '../constants';
import { db } from '/src/firebase';
import { doc, getDoc, where, collection, query, getDocs } from "firebase/firestore";

export async function fetchJudges() {
  let judges = []
  const q = query(collection(db, "judges"));
  const querySnapshot = await getDocs(q);

  const judgesDict = {};
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const docId = doc.id;
    judgesDict[docId] = data;
  });

  // Dynamically map fields from the data
  judges = Object.keys(judgesDict).map(key => {
    const judge = judgesDict[key];
    let judgeData = {};

    // Dynamically assign keys from the judge data to judgeData
    for (const field in judge) {
      judgeData[field] = judge[field];
    }

    return judgeData;
  });
  return judges
}

export async function fetchSpecificJudge(uid) {

  const judgeRef = doc(db, "judges", uid);  // Referring to a single judge document by UID
  const docSnapshot = await getDoc(judgeRef);  // Fetch the document snapshot
  console.log(docSnapshot.data())
  if (docSnapshot.exists()) {
    const judgeData = docSnapshot.data();

    return judgeData;  // Return the judge data directly
  } else {
    throw new Error("Judge not found");  // Handle case where judge is not found
  }
}



export async function fetchProjects() {

  const q = query(collection(db, "project"));
  const querySnapshot = await getDocs(q);
  let projects = [];
  const projectsDict = {};

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const docId = doc.id;
    projectsDict[docId] = data;
  });

  // Dynamically map fields from the data
  projects = Object.keys(projectsDict).map(key => {
    const project = projectsDict[key];
    let projectData = {};

    // Dynamically assign keys from the project data to projectData
    for (const field in project) {
      projectData[field] = project[field];
    }

    return projectData;
  });

  return projects
}


export async function fetchCaseStudies() {
  const q = query(collection(db, "caseStudies"));
  const querySnapshot = await getDocs(q);
  let caseStudies = [];
  const caseStudiesDict = {};

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const docId = doc.id;
    caseStudiesDict[docId] = data;
  });

  // Dynamically map fields from the data
  caseStudies = Object.keys(caseStudiesDict).map(key => {
    const caseStudies = caseStudiesDict[key];
    let caseStudiesData = {};

    // Dynamically assign keys from the project data to projectData
    for (const field in caseStudies) {
      if (field == "submissionTime") {
        caseStudiesData[field] = (caseStudies[field].submissionTime.seconds * 1000).toLocaleString()
      }
      else {
        caseStudiesData[field] = caseStudies[field];
      }
    }
    return caseStudiesData;
  });
  return caseStudies
}

export class calculateSentiment {
  constructor() { }

  sendMessage(message) {
    // Return a Promise from the function so we can wait for the asynchronous result
    return new Promise((resolve, reject) => {
      // Make sure message is passed to the function
      fetch('http://localhost:8000/judge-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }), // Send the message in the request body
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Response:', data); // Log the response
          resolve(data); // Resolve the Promise with the data
        })
        .catch(error => {
          console.error('Error sending message:', error); // Log any errors
          reject(error); // Reject the Promise with the error
        });
    });
  }
}


// Data retrieval: Obtain data from participant document
export async function fetchParticipantProject(uid) {
  try {
    const participantDocRef = doc(db, "participant", uid);
    const participantDoc = await getDoc(participantDocRef);

    if (!participantDoc.exists()) {
      throw new Error("Participant not found");
    }

    const participantData = participantDoc.data();
    const teamId = participantData.teamID;

    const teamDocRef = doc(db, "team", teamId);
    const teamDoc = await getDoc(teamDocRef);

    if (!teamDoc.exists()) {
      throw new Error("Team not found");
    }

    const teamData = teamDoc.data();
    const projectId = teamData.projectID;

    const projectRef = doc(db, "project", projectId);
    const projectDoc = await getDoc(projectRef);

    if (!projectDoc.exists()) {
      throw new Error("Project not found");
    }

    return { id: projectDoc.id, data: projectDoc.data() };

  } catch (error) {
    console.error("Error fetching participant project:", error);
    throw error;
  }
}

export async function fetchTeamIdByUserUid(uid) {
  try {
    const participantDocRef = doc(db, "participant", uid);
    const participantDoc = await getDoc(participantDocRef);

    if (participantDoc.exists()) {
      const participantData = participantDoc.data();
      const teamID = participantData.teamID;

      if (teamID) {
        return teamID;
      } else {
        console.log("No team ID found for the given document ID");
        return null;
      }
    } else {
      console.log("No participant found for the given document ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching participant by document ID:", error);
    throw error;
  }
}

export const checkSessionExpired = () => {
  const loginTime = localStorage.getItem('loginTime');
  if (loginTime) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - parseInt(loginTime);

    if (timeDifference > loginTimePeriod) {
      return true;
    }
  } else {
    refreshSession();
  }
  return false;
}

export const refreshSession = () => {
  localStorage.setItem('loginTime', new Date().getTime().toString());
}
