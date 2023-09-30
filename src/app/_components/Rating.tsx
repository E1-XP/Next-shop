import * as React from "react";
import StarIcon from "./icons/Star";
import { twMerge } from "tailwind-merge";

interface Props {
  rate: number;
  className?: string;
}

const Rating = ({ rate, className }: Props) => {
  return (
    <div className={twMerge("flex", className)}>
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
