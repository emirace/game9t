import React from "react";
import ICONS from "../../assets/icons/icons";

interface RatingProps {
  rating: number;
}

const MAX_STARS = 5;

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const filledStars = Math.round(rating);
  const emptyStars = MAX_STARS - filledStars;

  return (
    <div className="flex items-center gap-2">
      {[...Array(filledStars)].map((_, index) => (
        <img
          key={index}
          src={ICONS.star_color}
          className="h-4 w-4"
          alt="filled star"
        />
      ))}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <img
          key={index}
          src={ICONS.star}
          className="h-4 w-4"
          alt="empty star"
        />
      ))}
    </div>
  );
};

export default Rating;
