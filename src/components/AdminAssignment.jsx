import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchProjects, fetchJudges } from "../controller/controller.jsx";
import { db } from '/src/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const SearchDropdown = ({ project }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionsArray, setOptionsArray] = useState([]);
  console.log(optionsArray)
  // Log the selected option whenever it changes
  useEffect(() => {
    const fetchAndSetJudges = async () => {
      let judge = await fetchJudges();
      const judges = judge.sort((a, b) => a.id - b.id);
      const optionsArray = judges.map(judge => ({
        value: judge.name,
        label: judge.name,
        id: judge.id
      }));
      setOptionsArray(optionsArray);
    };

    fetchAndSetJudges();

    if (selectedOption) {
      console.log("Selected option changed to:", selectedOption);
      updateProject(selectedOption);
    }
  }, [selectedOption]);

  const handleChange = async (option) => {
    // Log the selected option before the change
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

  return (
    <div>
      <Select
        value={optionsArray.value}
        onChange={handleChange}
        options={optionsArray}
        defaultValue={optionsArray[project.judge]}
      />
    </div>
  );
};

export default SearchDropdown;
