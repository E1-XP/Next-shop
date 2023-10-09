"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

import PlusIcon from "./icons/Plus";
import MinusIcon from "./icons/Minus";

import { useCartStore } from "../_store/cart";
import { Product } from "@prisma/client";
import { sizeKeys } from "./SizeSelector";

type Variants = "sm" | "lg";
interface Props {
  variant?: Variants;
  product: Product;
  outsideControl?: [number, (n: number) => void];
  className?: string;
  isSizeSelected?: boolean;
  size?: sizeKeys;
}

const QuantityInput = ({
  className,
  variant = "lg",
  product,
  outsideControl,
  isSizeSelected,
  size,
}: Props) => {
  const data = {
    selectsizeText:
      "Please select size first, so we can check product availability.",
    outOfStockText:
      "Sorry, we don't have more copies of this product in stock at this moment.",
  };

  const { products, addProduct, removeProduct } = useCartStore();
  const productId = product.id;

  const productInCart = products.find(
    (p) => p.product.id === productId && p.size === size
  );

  const initialValue = productInCart?.quantity || 1;

  const [count, setCount] = React.useState(initialValue);
  const isControlledFromOutside = !!outsideControl;

  const onIncrement = () => {
    if (isSizeSelected === false) {
      toast.info(data.selectsizeText);

      return;
    }

    if (
      // check size availability
      (productInCart && // product in cart already
        productInCart.product[productInCart.size] <=
          (isControlledFromOutside ? outsideControl[0] : count)) ||
      (size && // product not yet in cart
        product[size] <= (isControlledFromOutside ? outsideControl[0] : count))
    ) {
      toast.info(data.outOfStockText);

      return;
    }

    isControlledFromOutside
      ? outsideControl[1](outsideControl[0] + 1)
      : setCount(count + 1);

    const quantity = isControlledFromOutside ? outsideControl[0] : 1;

    !isControlledFromOutside &&
      productInCart &&
      addProduct({ ...productInCart, quantity });
  };

  const onDecrement = () => {
    isControlledFromOutside
      ? outsideControl[1](Math.max(1, outsideControl[0] - 1))
      : setCount(count - 1);

    !isControlledFromOutside &&
      productInCart &&
      size &&
      removeProduct({ id: productInCart.product.id, size });
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
