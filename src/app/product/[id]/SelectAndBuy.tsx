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

  return (
    <>
      <ColorSelector data={productVariants} className="mt-4" />
      <SizeSelector
        data={product}
        className="mt-4"
        outsideControl={[size, selectSize]}
      />
      <QuantityInput
        className="w-full mt-4"
        productId={product.id}
        outsideControl={[quantity, setQuantity]}
        isSizeSelected={size !== undefined}
      />
      <AddToCartButton
        product={product}
        quantity={quantity}
        isSizeSelected={size !== undefined}
      />
    </>
  );
};

export default SelectAndBuy;
