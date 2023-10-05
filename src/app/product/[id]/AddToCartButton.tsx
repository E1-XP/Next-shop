"use client";

import * as React from "react";
import Button from "../../_components/Button";

import { useCartStore } from "@/app/_store/cart";
import { toast } from "react-toastify";

import { Product } from "@prisma/client";

interface Props {
  product: Product;
  quantity: number;
  isSizeSelected: boolean;
}

const AddToCartButton = ({ product, quantity, isSizeSelected }: Props) => {
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

    addProduct({ product, quantity });

    toast.success(data.toastText);
  };

  return (
    <Button className="w-full" onClick={addProductToCart}>
      {data.btnText}
    </Button>
  );
};

export default AddToCartButton;
