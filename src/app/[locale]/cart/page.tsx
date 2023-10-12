import * as React from "react";
import { useTranslations } from "next-intl";

import ProductTable from "./ProductTable";
import CartSummary from "./CartSummary";
import CouponInput from "./CouponInput";

const CartPage = () => {
  const t = useTranslations("Cart");

  const data = { heading: t("heading") };

  return (
    <div className="wrapper flex flex-col gap-[52px] py-[52px]">
      <header className="flex justify-center">
        <h2 className="heading-2 md:heading-1">{data.heading}</h2>
      </header>
      <ProductTable className="content" />
      <div className="flex flex-col justify-between md:flex-row gap-[56px] content mt-[52px] w-full">
        <CouponInput className="md:basis-[37.2%]" />
        <CartSummary className="md:basis-[47.2%]" />
      </div>
    </div>
  );
};

export default CartPage;
