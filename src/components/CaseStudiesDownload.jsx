import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import "../styles/underline.css";

const caseStudies = [
  {
    title: "Case Study 1: Sustainable Agriculture in Kenya",
    description: "This study examines how sustainable farming practices, like drip irrigation and drought-resistant crops, have improved food security and farmers' livelihoods in Kenya.",
    downloadLink: "public/downloads/kenya.pdf",
  },
  {
    title: "Case Study 2: Renewable Energy in India",
    description: "India's investment in solar and wind energy, particularly in Rajasthan, is providing affordable power to rural areas and reducing dependence on fossil fuels.",
    downloadLink: "/downloads/india.pdf",
  },
  {
    title: "Case Study 3: Women Empowerment in Bangladesh",
    description: "Microfinance and vocational training have enabled women in Bangladesh to start businesses, gain economic independence, and uplift their communities.",
    downloadLink: "/downloads/bangladesh.pdf",
  },
  {
    title: "Case Study 4: Clean Water Initiatives in Ghana",
    description: "In rural Ghana, solar-powered water pumps have improved access to clean drinking water, significantly enhancing public health and sanitation.",
    downloadLink: "/downloads/ghana.pdf",
  },
  {
    title: "Case Study 5: Conservation of Marine Life in the Philippines",
    description: "Community-led conservation efforts in the Philippines have protected coral reefs and marine life, boosting biodiversity and supporting sustainable tourism.",
    downloadLink: "/downloads/philippines.pdf",
  }
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
