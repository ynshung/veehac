import React, { useState, useEffect } from "react";
import "../styles/RatingSlider.css";

const RatingSlider = ({ rating, handleChangeRating, id, category }) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        className="slider"
        id="slider"
        style={{ marginLeft: "4px" }}
        value={rating}
        onChange={(e) => {
          handleChangeRating(e.target.value);
        }}
      />
      <div className="labels">
        {Array.from({ length: 11 }, (_, i) => (
          <span className="label" key={i}>
            {i}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RatingSlider;
