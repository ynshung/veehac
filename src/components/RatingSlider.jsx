import '../styles/RatingSlider.css';

const RatingSlider = () => {
  return (
    <div className="slider-container">
      <input type="range" min="1" max="10" step="1" className="slider" id="slider" style={{ marginLeft: '4px' }} />
      <div className="labels">
        {Array.from({ length: 10 }, (_, i) => (
          <span className="label" key={i}>{i + 1}</span>
        ))}
      </div>
    </div>
  );
};

export default RatingSlider;