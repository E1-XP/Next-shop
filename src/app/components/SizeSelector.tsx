"use client";

import { Product } from "@prisma/client";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  data: Product;
}

const SizeSelector = ({ className, data }: Props) => {
  const sizes = ["xs", "s", "m", "l", "xl", "xxl"];

  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);

  return (
    <div className={twMerge("flex gap-2", className)}>
      {sizes.map((size) => (
        <button
          key={size}
          disabled={data[size] <= 0}
          className={`font-body text-sm font-normal leading-[22px] px-[15px] py-1 border  rounded-[4px] hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-60 ${
            selectedSize === size
              ? "border-darkGray2"
              : "border-grayWhite opacity-90"
          }`}
          onClick={() => setSelectedSize(size)}
        >
          {size.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
