import CaseStudies from '../components/CaseStudies.astro';
import { db } from '/src/firebase';
import { collection, query, getDocs } from "firebase/firestore";

import { getDoc, doc } from 'firebase/firestore';

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
    constructor() {}

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


