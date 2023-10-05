"use client";

import * as React from "react";

import { Product } from "@prisma/client";

import ColorSelector from "@/app/_components/ColorSelector";
import QuantityInput from "@/app/_components/QuantityInput";
import SizeSelector from "@/app/_components/SizeSelector";
import AddToCartButton from "../AddToCartButton";

interface Props {
  product: Product;
  colorData: Product[];
}

const SelectAndBuy = ({ product, colorData }: Props) => {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <>
      <ColorSelector data={colorData} className="mt-4" />
      <SizeSelector data={product} className="mt-4" />
      <QuantityInput
        className="w-full mt-4"
        productId={product.id}
        outsideControl={[quantity, setQuantity]}
      />
      <AddToCartButton product={product} quantity={quantity} />
    </>
  );
};

export default SelectAndBuy;
