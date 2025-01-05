import CaseStudies from '../components/CaseStudies.astro';
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

        // Add the docId as 'id' in the final object
        judgeData.id = key;

        return judgeData;
    });
    return judges
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
                console.log("AAA")
            }
            else {
                caseStudiesData[field] = caseStudies[field];
            }
        }
        return caseStudiesData;
    });
    console.log("REFRESH", caseStudies);
    return caseStudies
}

// Data retrieval: Obtain data from team document
// export async function fetchParticipantProject(userId){
//   const teamQueries = [
//     query(collection(db, "team"), where("leaderID", "==", userId)),
//     query(collection(db, "team"), where("memberID1", "==", userId)),
//     query(collection(db, "team"), where("memberID2", "==", userId)),
//     query(collection(db, "team"), where("memberID3", "==", userId))
//   ];

//   let teamID = null;

//   for (const q of teamQueries) {
//     const querySnapshot = await getDocs(q);
//     if (!querySnapshot.empty) {
//       const docSnapshot = querySnapshot.docs[0];
//       teamID = docSnapshot.id;
//       break;
//     }
//   }

//   if (!teamID) {
//     return null; 
//   }

//   const projectQuery = query(collection(db, "project"), where("teamID", "==", teamID));
//   const projectSnapshot = await getDocs(projectQuery);

//   if (!projectSnapshot.empty) {
//     const projectDoc = projectSnapshot.docs[0];
//     return { id: projectDoc.id, data: projectDoc.data() };
//   }

//   return null; 
// };

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