"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import { Product } from "@prisma/client";

interface Props {
  className?: string;
  data: Product[];
}

const ColorSelector = ({ className, data }: Props) => {
  const params = useParams();
  const productId = Number(params.id);

  return (
    <div className={twMerge("flex gap-3", className)}>
      {data.map((item) => (
        <Link key={item.id} href={`/product/${item.id}`} className="group">
          <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full border bg-white border-darkGray">
            <span
              className={`block rounded-full group-hover:brightness-95 transition ${
                item.id === productId
                  ? "border border-darkGray h-8 w-8 "
                  : "w-[38px] h-[38px] "
              }`}
              style={{ backgroundColor: item.color }}
            ></span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ColorSelector;
