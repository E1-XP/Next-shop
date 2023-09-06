"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import PlusIcon from "./icons/Plus";
import MinusIcon from "./icons/Minus";

type Variants = "sm" | "lg";
interface Props {
  variant?: Variants;
  className?: string;
}

const QuantityInput = ({ className, variant = "lg" }: Props) => {
  const [count, setCount] = React.useState(1);

  return (
    <div
      className={twMerge(
        "flex font-display bg-whiteGray2 justify-between items-center",
        variant == "sm" ? " text-xs h-8 w-[84px]" : "text-base h-[52px]",
        className
      )}
    >
      <button
        className="w-1/3 px-3 py-1.5"
        onClick={() => setCount(Math.max(1, count - 1))}
      >
        <MinusIcon
          className={`stroke-darkGray ${
            variant === "sm" ? "w-3 h-3" : "w-5 h-5"
          }`}
        />
      </button>
      <span className="font-semibold">{count}</span>
      <button
        className="w-1/3 px-3 py-1.5 flex justify-end"
        onClick={() => setCount(count + 1)}
      >
        <PlusIcon
          className={`stroke-darkGray shrink-0 ${
            variant === "sm" ? "w-3 h-3" : "w-5 h-5"
          }`}
        />
      </button>
    </div>
  );
};

export default QuantityInput;
