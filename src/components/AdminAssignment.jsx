import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchJudges } from "../controller/controller.jsx";
import { db } from '/src/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const SearchDropdown = ({ project, optionsArray }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption) {
      console.log("Selected option changed to:", selectedOption);
      updateProject(selectedOption);
    }
  }, [selectedOption]);

  const handleChange = (option) => {
    console.log("Before change:", selectedOption);
    setSelectedOption(option);
  };

  const updateProject = async (selectedOption) => {
    const q = query(collection(db, "project"), where("id", "==", project.id));

    try {
      const querySnapshot = await getDocs(q);
      console.log({ id: selectedOption.id });

      if (!querySnapshot.empty) {
        const docRef = doc(db, "project", querySnapshot.docs[0].id);
        await updateDoc(docRef, { judge: parseInt(selectedOption.id) });
        console.log("Document successfully updated!");
      } else {
        console.log("No project found with the given ID");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // // Find the selected option and remove the id field by destructuring
  // let x = optionsArray.find(option => option.id === project.judge);

  // // Ensure that we safely remove the `id` from the object
  // if (x) {
  //   const { id, ...rest } = x; // Destructure and omit `id`
  //   x = rest; // This will be the new object without `id`
  // }
  console.log(optionsArray[project.judge], "psdogjlfk")

  return (
    <div>
      <Select
        // value={selectedOption}
        onChange={handleChange}
        options={optionsArray}
        name="id"
        defaultValue={optionsArray[project.judge]}
      />
    </div>
  );
};

export default SearchDropdown;
