import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { fetchCaseStudies } from '../controller/controller';
import "../styles/underline.css";

const CaseStudiesDownload = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCaseStudies = await fetchCaseStudies();
      setCaseStudies(fetchedCaseStudies);
    };

    fetchData();
  }, []); 

  const handleChange = (event) => {
    const selectedStudy = caseStudies.find(
        (caseStudy) => caseStudy.id === parseInt(event.target.value)
    );
    console.log("selected study:", selectedStudy);
    setSelectedCaseStudy(selectedStudy);
};

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  };

  const labelContainerStyle = {
    alignSelf: "flex-start",
    marginBottom: "0.5rem",
    fontSize: "1.5rem",
  };

  const selectStyle = {
    padding: "10px",
    fontSize: "1.5rem",
    borderRadius: "15px",
    width: "100%",
    backgroundColor: "#433f6c",
    color: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    textAlignLast: "center",
    cursor: "pointer",
  };

  const optionStyle = {
    padding: "10px",
    fontSize: "1.25rem",
    color: "white",
    backgroundColor: "#433f6c",
  };

  const caseStudyDescStyle = {
    marginTop: "0.5rem",
    fontSize: "1.0rem",
    border: "none",
    borderRadius: "15px",
    width: "100%",
    backgroundColor: "#433f6c",
    color: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const downloadLinkStyle = {
    padding: "10px 0",
    display: "inline-block",
    width: "100%",
    marginTop: "0.5rem",
    fontSize: "1.0rem",
    fontWeight: "bold",
    color: "white",
    border: "none",
    borderRadius: "15px",
    backgroundColor: "black",
    textDecoration: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  };

  const downloadLinkHoverStyle = {
    backgroundColor: "darkgray",
  };

  const caseStudyStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <div style={labelContainerStyle}>
        <label htmlFor="case-study" className="full-width-underline">
          Case Study:
        </label>
      </div>
      <select id="case-study" onChange={handleChange} style={selectStyle}>
        <option value="" style={optionStyle}>
          Select a case study
        </option>
        {caseStudies
          .sort((a, b) => a.id - b.id) // Sort case studies by id
          .map((caseStudy) => (
          <option key={caseStudy.id} value={caseStudy.id} style={optionStyle}>
            Case Study {caseStudy.id}: {caseStudy.title}  
          </option>
        ))}
      </select>
      {selectedCaseStudy && (
        <div style={caseStudyStyle}>
          <div style={caseStudyDescStyle}>
            <p>{selectedCaseStudy.description}</p>
          </div>
          <a
            href={selectedCaseStudy.downloadLink}
            download
            style={
              isHovered
                ? { ...downloadLinkStyle, ...downloadLinkHoverStyle }
                : downloadLinkStyle
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FaDownload
              style={{
                marginRight: "0.5rem",
                marginTop: "0.5rem",
                fontSize: "0.9rem",
              }}
            />
            Download Case Study Document
          </a>
        </div>
      )}
    </div>
  );
};

export default CaseStudiesDownload;