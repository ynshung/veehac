import React, { useState } from "react";

const Confirm = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(true); // Pass true when "Yes" is clicked
    onClose(); // Close the dialog
  };

  const handleCancel = () => {
    onConfirm(false); // Pass false when "Cancel" is clicked
    onClose(); // Close the dialog
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Do you want to confirm?</h3>
        <button
          onClick={handleConfirm}
          style={{
            width: "85px",
            padding: "10px 20px",
            backgroundColor: "#433f6c",
            "margin-right": "10px",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: "Chesna Grotesk",
          }}
        >
          Yes
        </button>
        <button
          onClick={handleCancel}
          style={{
            width: "85px",
            padding: "10px 20px",
            backgroundColor: "#d9d9d9",
            "margin-left": "10px",
            color: "black",
            border: "1px",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: "Chesna Grotesk",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Simple styling for the modal and overlay
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  textAlign: "center",
  width: "300px",
};

export default Confirm;
