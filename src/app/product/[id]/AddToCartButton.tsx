"use client";

import * as React from "react";
import { toast } from "react-toastify";

import Button from "../../_components/Button";

import { useCartStore } from "@/app/_store/cart";
import { Product } from "@prisma/client";
import { sizeKeys } from "@/app/_components/SizeSelector";

interface Props {
  product: Product;
  quantity: number;
  isSizeSelected: boolean;
  size: sizeKeys | undefined;
  resetSize: () => void;
  resetQuantity: () => void;
}

const AddToCartButton = ({
  product,
  quantity,
  isSizeSelected,
  size,
  resetQuantity,
  resetSize,
}: Props) => {
  const { addProduct } = useCartStore();

  const data = {
    btnText: " Add to Cart",
    sizeNotSelectedText:
      "Please select size first, so we can check product availability.",
    toastText: "Product added to cart.",
  };

  const addProductToCart = () => {
    if (typeof product.id !== "string") return;

    if (!isSizeSelected) {
      toast.info(data.sizeNotSelectedText);
      return;
    }

    size && addProduct({ product, quantity, size });

    toast.success(data.toastText);

    resetQuantity();
    resetSize();
  };

  return (
    <Button className="w-full" onClick={addProductToCart}>
      {data.btnText}
    </Button>
  );
};

export default AddToCartButton;
