"use client";

import * as React from "react";

import { Product } from "@prisma/client";
import ProductItem from "./ProductItem";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const data = {
    categories: [
      { name: "Trending products" },
      { name: "New Arrivals" },
      { name: "Sale" },
    ],
  };

  const [activeMenuIdx, setActiveMenuIdx] = React.useState(0);

  return (
    <div className="wrapper flex flex-col gap-12">
      <div className="flex items-center justify-between w-full max-w-[500px] mx-auto pt-16">
        {data.categories.map((category, i) => (
          <button
            key={category.name}
            className={`font-body text-base lg:text-xl font-normal hover:opacity-70 ${
              activeMenuIdx === i ? "!font-semibold underline" : ""
            }`}
            onClick={() => setActiveMenuIdx(i)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {products.length
          ? products.map((product) => (
              <ProductItem key={product.id} data={...product} />
            ))
          : "Nothing found."}
      </div>
    </div>
  );
};

export default ProductList;
