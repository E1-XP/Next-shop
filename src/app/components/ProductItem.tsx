import { Product } from "@prisma/client";
import Image from "next/image";
import * as React from "react";
import Rating from "./Rating";
import Link from "next/link";

interface Props {
  data: Product;
}

const ProductItem = ({ data }: Props) => {
  return (
    <div className="relative group">
      <Image
        src={data.images[0]}
        alt={data.name}
        width={640}
        height={800}
        className="transition group-hover:opacity-90"
      />
      <div className="py-4 px-2 flex flex-col gap-2">
        <Rating rate={data.rating} />
        <p>{data.brand}</p>
        <p className="truncate">{data.name}</p>
        <p className="flex gap-3 text-lg">
          <span className="font-bold font-display">${data.price}</span>
          <span className="line-through opacity-70 font-display">
            ${data.oldPrice}
          </span>
        </p>
      </div>
      <Link
        href={`product/${data.id}`}
        className="absolute top-0 left-0 right-0 bottom-0"
      />
    </div>
  );
};

export default ProductItem;
