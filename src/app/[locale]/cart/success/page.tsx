"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import Button from "@/app/_components/Button";
import { useCartStore } from "@/app/_store/cart";
import { useHydrate } from "@/app/_hooks/useHydrate";

const CartSuccessPage = () => {
  const t = useTranslations("CartSuccess");

  const { clearBasket } = useCartStore();
  const isHydrating = useHydrate();

  React.useEffect(() => {
    if (!isHydrating) clearBasket();
  }, [isHydrating]);

  const data = {
    heading: t("heading"),
    paragraph: t("paragraph"),
    btnText: t("btnText"),
    href: "/",
  };

  return (
    <div className="wrapper flex flex-col grow gap-[75px] py-[52px]">
      <header className="flex justify-center flex-col">
        <h2 className="heading-2 md:heading-1 text-center">{data.heading}</h2>
      </header>
      <div className="flex flex-col gap-24 items-center">
        <p className="text-lg font-normal font-body leading-[30px] content">
          {data.paragraph}
        </p>
        <Button className="self-center" rounded asLink href={data.href}>
          {data.btnText}
        </Button>
      </div>
    </div>
  );
};

export default CartSuccessPage;
