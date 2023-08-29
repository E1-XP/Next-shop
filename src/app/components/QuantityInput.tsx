"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import PlusIcon from "./icons/Plus";
import MinusIcon from "./icons/Minus";

interface Props {
  className?: string;
}

const QuantityInput = ({ className }: Props) => {
  const [count, setCount] = React.useState(1);

  return (
    <div
      className={twMerge(
        "flex font-display bg-whiteGray2 justify-between items-center h-[52px]",
        className
      )}
    >
      <button
        className="w-1/3 px-3 py-1.5"
        onClick={() => setCount(Math.max(1, count - 1))}
      >
        <MinusIcon className="stroke-darkGray w-5 h-5" />
      </button>
      <span className="font-semibold">{count}</span>
      <button
        className="w-1/3 px-3 py-1.5 flex justify-end"
        onClick={() => setCount(count + 1)}
      >
        <PlusIcon className="stroke-darkGray w-5 h-5" />
      </button>
    </div>
  );
};

export default QuantityInput;
