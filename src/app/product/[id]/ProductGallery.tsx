"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import * as React from "react";

interface Props {
  data: Product;
}

const ProductGallery = ({ data }: Props) => {
  const [activeIdx, setActiveIdx] = React.useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex md:flex-col gap-4 basis-1/6">
        {data.images.map((img, i) => (
          <button
            key={img}
            className={`border-2 ${
              activeIdx === i ? "border-darkGray" : "border-transparent"
            }`}
            onClick={() => setActiveIdx(i)}
            onMouseOver={() => setActiveIdx(i)}
          >
            <Image
              src={img}
              alt={data.name}
              width={1800}
              height={2600}
              className="pointer-events-none"
            />
          </button>
        ))}
      </div>
      <div className="basis-5/6 max-md:-order-1">
        <Image
          src={data.images[activeIdx]}
          alt={data.name}
          width={1800}
          height={2600}
          className="pointer-events-none"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
