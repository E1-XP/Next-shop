"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import ProductTable from "./ProductTable";
import CartSummary from "./CartSummary";
import CouponInput from "./CouponInput";
import Button from "@/app/_components/Button";
import ScrollableSlider from "@/app/_components/ScrollableSlider";

import { useCartStore } from "@/app/_store/cart";
import { useHydrate } from "@/app/_hooks/useHydrate";
import { Product } from "@prisma/client";

interface Props {
  products: Product[];
}

const CartDetails = ({ products }: Props) => {
  const t = useTranslations("Cart.CartDetails");

  const data = {
    paragraph: t("paragraph"),
    btnText: t("btnText"),
    href: "/",
    sliderHeading: t("sliderHeading"),
  };

  const { products: cartProducts } = useCartStore();
  const isHydrating = useHydrate();

  const cartIsEmpty = !cartProducts.length;

  if (!isHydrating && cartIsEmpty) {
    return (
      <>
        <div className="wrapper flex flex-col gap-8">
          <p className="text text-center">{data.paragraph} </p>
          <Button className="self-center" rounded asLink href={data.href}>
            {data.btnText}
          </Button>
        </div>
        <ScrollableSlider heading={data.sliderHeading} products={products} />
      </>
    );
  }

  return (
    <div className="wrapper flex flex-col gap-[52px]">
      <ProductTable className="content" />
      <div className="flex flex-col justify-between md:flex-row gap-[56px] content mt-[52px] w-full">
        <CouponInput className="md:basis-[37.2%]" />
        <CartSummary className="md:basis-[47.2%]" />
      </div>
    </div>
  );
};

export default CartDetails;
