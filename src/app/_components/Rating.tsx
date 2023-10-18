import * as React from "react";
import StarIcon from "./icons/Star";
import { twMerge } from "tailwind-merge";

type variants = "md" | "xl";
interface Props {
  rate: number;
  variant?: variants;
  onClickSelect?: (n: number) => void;
  className?: string;
  itemClassName?: string;
}

const Rating = ({
  rate,
  onClickSelect,
  variant = "md",
  className,
  itemClassName,
}: Props) => {
  const StarWrapperTag: keyof JSX.IntrinsicElements = onClickSelect
    ? "button"
    : "span";

  return (
    <div className={twMerge("flex", className)}>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <StarWrapperTag
            type={StarWrapperTag === "button" ? "button" : undefined}
            key={i}
            onClick={onClickSelect ? () => onClickSelect(i + 1) : undefined}
          >
            <StarIcon
              className={twMerge(
                variant === "xl" ? "h-8 w-8" : "h-5 w-5",
                i < rate ? "fill-orange stroke-orange" : "stroke-darkGray",
                onClickSelect ? "cursor-pointer" : "",
                itemClassName
              )}
            />
          </StarWrapperTag>
        ))}
    </div>
  );
};

export default Rating;
