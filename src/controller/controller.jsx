import { db } from '/src/firebase';
import { collection, query, getDocs } from "firebase/firestore";



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
    console.log(projects)
    return projects
}
