import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import "../styles/underline.css";

const caseStudies = [
  {
    title: "Case Study 1: Web Application",
    description: "Learn about web application development.",
    downloadLink: "public/downloads/web-application.pdf",
  },
  {
    title: "Case Study 2: Educational Mobile App",
    description: "Explore educational mobile app development.",
    downloadLink: "/downloads/educational-mobile-app.pdf",
  },
  {
    title: "Case Study 3: E-commerce Platform",
    description: "Discover e-commerce platform development.",
    downloadLink: "/downloads/e-commerce-platform.pdf",
  },
];

const CaseStudiesDownload = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (event) => {
    const selectedTitle = event.target.value;
    const selectedStudy = caseStudies.find(
      (caseStudy) => caseStudy.title === selectedTitle,
    );
    setSelectedCaseStudy(selectedStudy);
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "80%",
    marginLeft: "-0.5rem",
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
    width: "101.5%",
    marginLeft: "0.5rem",
    backgroundColor: "black",
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
    backgroundColor: "black",
  };

  const caseStudyDescStyle = {
    marginTop: "0.5rem",
    fontSize: "1.0rem",
    border: "none",
    borderRadius: "15px",
    width: "101.5%",
    marginLeft: "0.5rem",
    backgroundColor: "black",
    color: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const downloadLinkStyle = {
    padding: "10px 0",
    display: "inline-block",
    width: "101.5%",
    marginLeft: "0.5rem",
    marginTop: "0.5rem",
    fontSize: "1.0rem",
    fontWeight: "bold",
    color: "black",
    border: "none",
    borderRadius: "15px",
    backgroundColor: "white",
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
        {caseStudies.map((caseStudy, index) => (
          <option key={index} value={caseStudy.title} style={optionStyle}>
            {caseStudy.title}
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
