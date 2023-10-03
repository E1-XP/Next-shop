"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import Widget from "./Base";
import Button from "../Button";
import ShoppingBagIcon from "../icons/ShoppingBag";

import { formatPrice } from "@/app/_helpers";

const CartWidget = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const cartItemsCount = 2;
  const totalCost = 0;

  const data = {
    loadingText: "Loading...",
    header: "Cart summary",
    btnText: "Go to cart page",
    btnUrl: "/cart",
  };

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const onButtonClick = () => {
    router.push(data.btnUrl);

    toggleIsOpen();
  };

  return (
    <Widget
      referenceContent={() => (
        <>
          <ShoppingBagIcon className="stroke-darkGray group-hover:opacity-60 transition h-[24px] w-[24px]" />
          {cartItemsCount && (
            <span className="bg-darkGray text-white text-xs font-body font-medium px-[9px] py-0.5 rounded-full ml-2 h-5 group-hover:opacity-70">
              {cartItemsCount}
            </span>
          )}
        </>
      )}
    >
      <div className="flex justify-between items-center w-full">
        <p className="heading-5">{data.header}</p>
        <span className="heading-6 font-semibold">
          {formatPrice(totalCost)}
        </span>
      </div>
      <p className="text whitespace-nowrap truncate">test</p>
      <Button
        className="whitespace-nowrap rounded-md w-full mt-auto"
        onClick={onButtonClick}
      >
        {data.btnText}
      </Button>
    </Widget>
  );
};

export default CartWidget;
