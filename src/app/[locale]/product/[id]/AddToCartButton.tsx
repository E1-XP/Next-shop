"use client";

import * as React from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

import Button from "../../../_components/Button";

import { useCartStore } from "@/app/_store/cart";
import { useHydrate } from "@/app/_hooks/useHydrate";

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
  const t = useTranslations("Product.AddToCartButton");

  const { addProduct } = useCartStore();
  useHydrate();

  const data = {
    btnText: t("btnText"),
    sizeNotSelectedText: t("sizeNotSelectedText"),
    toastText: t("toastText"),
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
