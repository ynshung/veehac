import React, { useState, useEffect } from 'react';
import '../styles/RatingSlider.css';

const RatingSlider = ({ rating, handleChangeRating, tempResults, id, category }) => {
  // console.log(projects)
  // console.log(id)
  // console.log(category)
  // Initialize the state with the value of rating["rating"]
  const [sliderValue, setSliderValue] = useState(rating["rating"]);

  // Update the state whenever the rating["rating"] changes (e.g., if it's passed as a prop that may change)
  useEffect(() => {
    setSliderValue(rating);
  }, [rating]);

  // Handler for when the slider value changes
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    handleChangeRating(category, parseInt(sliderValue) + 1)
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        className="slider"
        id="slider"
        style={{ marginLeft: '4px' }}
        value={sliderValue}
        onChange={handleSliderChange} // Update the state when slider value changes
      />
      <div className="labels">
        {Array.from({ length: 11 }, (_, i) => (
          <span className="label" key={i}>{i}</span>
        ))}
      </div>
    </div>
  );
};

export default RatingSlider;
