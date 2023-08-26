import * as React from "react";
import StarIcon from "./icons/Star";

interface Props {
  rate: number;
}

const Rating = ({ rate }: Props) => {
  return (
    <div className="flex">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${
              i < rate ? "fill-orange stroke-orange" : "stroke-darkGray"
            }`}
          />
        ))}
    </div>
  );
};

export default Rating;
