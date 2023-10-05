"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import PlusIcon from "./icons/Plus";
import MinusIcon from "./icons/Minus";

import { useCartStore } from "../_store/cart";

type Variants = "sm" | "lg";
interface Props {
  variant?: Variants;
  productId: string;
  outsideControl?: [number, (n: number) => void];
  className?: string;
}

const QuantityInput = ({
  className,
  variant = "lg",
  productId,
  outsideControl,
}: Props) => {
  const { products, addProduct, removeProduct } = useCartStore();

  const product = products.find((p) => p.product.id === productId);
  const initialValue = product?.quantity || 1;

  const [count, setCount] = React.useState(initialValue);
  const isControlledFromOutside = !!outsideControl;

  const onIncrement = () => {
    isControlledFromOutside
      ? outsideControl[1](outsideControl[0] + 1)
      : setCount(count + 1);

    const quantity = isControlledFromOutside ? outsideControl[0] : 1;

    !isControlledFromOutside && product && addProduct({ ...product, quantity });
  };

  const onDecrement = () => {
    isControlledFromOutside
      ? outsideControl[1](Math.max(1, outsideControl[0] - 1))
      : setCount(count - 1);

    !isControlledFromOutside && product && removeProduct(product.product.id);
  };

  return (
    <div
      className={twMerge(
        "flex font-display bg-whiteGray2 justify-between items-center",
        variant == "sm" ? " text-xs h-8 w-[84px]" : "text-base h-[52px]",
        className
      )}
    >
      <button className="w-1/3 px-3 py-1.5" onClick={onDecrement}>
        <MinusIcon
          className={`stroke-darkGray ${
            variant === "sm" ? "w-3 h-3" : "w-5 h-5"
          }`}
        />
      </button>
      <span className="font-semibold">
        {isControlledFromOutside ? outsideControl[0] : count}
      </span>
      <button
        className="w-1/3 px-3 py-1.5 flex justify-end"
        onClick={onIncrement}
      >
        <PlusIcon
          className={`stroke-darkGray shrink-0 ${
            variant === "sm" ? "w-3 h-3" : "w-5 h-5"
          }`}
        />
      </button>
    </div>
  );
};

export default QuantityInput;
