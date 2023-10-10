"use client";

import * as React from "react";

import { Product } from "@prisma/client";

import ColorSelector from "@/app/_components/ColorSelector";
import QuantityInput from "@/app/_components/QuantityInput";
import SizeSelector, { sizeKeys } from "@/app/_components/SizeSelector";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
  productVariants: Product[];
}

const SelectAndBuy = ({ product, productVariants }: Props) => {
  const [quantity, setQuantity] = React.useState(1);
  const [size, selectSize] = React.useState<sizeKeys | undefined>(undefined);

  const resetSize = () => selectSize(undefined);
  const resetQuantity = () => setQuantity(1);

  return (
    <>
      <ColorSelector data={productVariants} className="mt-4" />
      <SizeSelector
        product={product}
        className="mt-4"
        outsideControl={[size, selectSize]}
      />
      <QuantityInput
        className="w-full mt-4"
        product={product}
        outsideControl={[quantity, setQuantity]}
        isSizeSelected={size !== undefined}
        size={size}
      />
      <AddToCartButton
        product={product}
        quantity={quantity}
        isSizeSelected={size !== undefined}
        size={size}
        resetSize={resetSize}
        resetQuantity={resetQuantity}
      />
    </>
  );
};

export default SelectAndBuy;
