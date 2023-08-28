"use client";

import * as React from "react";

import { Product } from "@prisma/client";
import ProductItem from "./ProductItem";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const data = {
    heading: "Trending products",
  };

  return (
    <div className="wrapper flex flex-col gap-12">
      <div className="flex items-center justify-between mx-auto pt-16">
        <h2 className="font-display text-2xl font-normal">{data.heading}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {products.length
          ? products.map((product) => (
              <ProductItem key={product.id} data={product} />
            ))
          : "Nothing found."}
      </div>
    </div>
  );
};

export default ProductList;
