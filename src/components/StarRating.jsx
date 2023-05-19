import React, { useState } from "react";

const StarRating = ({onRatingChange}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    // Updates the ui with changes made
    const handleRatingChange = (index) => {
      setRating(index);
      onRatingChange(index);
    };

    // Resets rating by double clicking
    const handleDoubleClick = () => {
      setRating(0);
      setHover(0);
      onRatingChange(0);
    };

    return (
      <div className="star-rating" style={{ fontSize: "30px" }}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => handleRatingChange(index)}
              onDoubleClick={handleDoubleClick}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating;