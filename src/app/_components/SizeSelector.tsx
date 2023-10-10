"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

import { Product } from "@prisma/client";
import { useCartStore } from "../_store/cart";
import { useHydrate } from "../_hooks/useHydrate";

export type sizeKeys = "xs" | "s" | "m" | "l" | "xl" | "xxl";
interface Props {
  className?: string;
  product: Product;
  outsideControl: [sizeKeys | undefined, (s: sizeKeys) => void];
}

const SizeSelector = ({ className, product, outsideControl }: Props) => {
  const { products } = useCartStore();
  useHydrate();

  const productId = product.id;

  const [selectedSize, setSelectedSize] = outsideControl;

  const productSizesInCart = products.filter((p) => p.product.id === productId);

  const findSize = (s: sizeKeys) =>
    productSizesInCart.find((p) => p.size === s);

  const sizes = ["xs", "s", "m", "l", "xl", "xxl"] as sizeKeys[];

  return (
    <div className={twMerge("flex gap-2", className)}>
      {sizes.map((size) => {
        const productInCart = findSize(size);

        return (
          <button
            key={size}
            disabled={
              product[size] <= 0 ||
              (productInCart && product[size] - productInCart.quantity <= 0)
            }
            className={`font-body text-sm font-normal leading-[22px] w-12 py-1 border rounded-[4px] hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40 flex items-center justify-center ${
              selectedSize === size
                ? "border-darkGray2 ring-darkGray2 ring-1"
                : "border-grayWhite opacity-90"
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default SizeSelector;
