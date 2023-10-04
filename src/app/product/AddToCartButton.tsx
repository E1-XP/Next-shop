"use client";

import * as React from "react";
import Button from "../_components/Button";

import { useCartStore } from "@/app/_store/cart";
import { toast } from "react-toastify";

import { Product } from "@prisma/client";

interface Props {
  product: Product;
}

const AddToCartButton = ({ product }: Props) => {
  const { addProduct } = useCartStore();

  const data = { btnText: " Add to Cart" };

  const addProductToCart = () => {
    if (typeof product.id !== "string") return;

    addProduct({ product, quantity: 1 });

    toast.success("Product added to cart.");
  };

  return (
    <Button className="w-full" onClick={addProductToCart}>
      {data.btnText}
    </Button>
  );
};

export default AddToCartButton;
