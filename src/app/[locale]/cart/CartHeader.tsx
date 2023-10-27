"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

const CartHeader = () => {
  const t = useTranslations("Cart");

  const data = { heading: t("heading") };

  return (
    <header className="wrapper flex justify-center">
      <h2 className="heading-2 md:heading-1">{data.heading}</h2>
    </header>
  );
};

export default CartHeader;
