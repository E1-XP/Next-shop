"use client";

import { Product } from "@prisma/client";
import * as React from "react";
import { twMerge } from "tailwind-merge";

export type sizeKeys = "xs" | "s" | "m" | "l" | "xl" | "xxl";
interface Props {
  className?: string;
  data: Product;
  outsideControl: [sizeKeys | undefined, (s: sizeKeys) => void];
}

const SizeSelector = ({ className, data, outsideControl }: Props) => {
  const sizes = ["xs", "s", "m", "l", "xl", "xxl"] as sizeKeys[];

  const [selectedSize, setSelectedSize] = outsideControl;

  return (
    <div className={twMerge("flex gap-2", className)}>
      {sizes.map((size) => (
        <button
          key={size}
          disabled={data[size] <= 0}
          className={`font-body text-sm font-normal leading-[22px] w-12 py-1 border  rounded-[4px] hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40 ${
            selectedSize === size
              ? "border-darkGray2 ring-darkGray2 ring-1"
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
