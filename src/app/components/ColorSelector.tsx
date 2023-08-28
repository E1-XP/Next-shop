import { Product } from "@prisma/client";
import Link from "next/link";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  data: Product[];
}

const ColorSelector = ({ className, data }: Props) => {
  return (
    <div className={twMerge("flex gap-3", className)}>
      {data.map((item) => (
        <Link key={item.id} href={`/product/${item.id}`} className="group">
          <span
            className={`w-[38px] h-[38px] rounded-full group-hover:brightness-95 transition ${
              true ? "block border border-darkGray" : ""
            }`}
            style={{ backgroundColor: item.color }}
          ></span>
        </Link>
      ))}
    </div>
  );
};

export default ColorSelector;
