import { db } from '/src/firebase';
import { collection, query, getDocs } from "firebase/firestore";

export let judges = [];

async function something() {
    const q = query(collection(db, "judges"));
    const querySnapshot = await getDocs(q);

    // Initialize an empty dictionary (object) to store judge data
    const judgesDict = {}; 

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const docId = doc.id; // Get the document ID

        // Add each document's ID and its associated data to the judgesDict
        judgesDict[docId] = data;
    });

    // Now, dynamically place the content of each judge entry into the `judges` array
    judges = Object.keys(judgesDict).map(key => {
        const judge = judgesDict[key];
        return {
            name: judge.name,
            company: judge.company,
            about: judge.about,
            id: key, // Use the document ID as the ID
            imageURL: judge.imageURL
        };
    });
}

// Call the function and handle the result
something().then(() => {
    // judges array is now populated with the extracted data
    console.log(judges);
}).catch((error) => {
    console.error(error);
});
