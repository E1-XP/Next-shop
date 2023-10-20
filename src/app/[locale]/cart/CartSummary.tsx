"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";

import { formatPrice, getProductsPrice } from "@/app/_helpers";

import { useCartStore } from "@/app/_store/cart";
import { useHydrate } from "@/app/_hooks/useHydrate";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const CartSummary = ({ className }: Props) => {
  const t = useTranslations("Cart.CartSummary");
  const router = useRouter();

  const { products } = useCartStore();
  useHydrate();

  const data = {
    heading: t("heading"),
    shippingOptions: [
      { name: t("shippingOptions.0.name"), price: 0 },
      { name: t("shippingOptions.1.name"), price: 15 },
    ],
    subtotalText: t("subtotalText"),
    totalText: t("totalText"),
    btnText: t("btnText"),
  };

  const [activeOption, setActiveOption] = React.useState(
    data.shippingOptions[0].price
  );

  const getTotalPrice = () => getProductsPrice(products) + activeOption;

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveOption(Number(e.target.value));
  };

  const { mutate: checkout } = trpc.payment.checkout.useMutation({
    onSuccess(data) {
      if (data.url) router.push(data.url);
    },
    onError(err) {
      console.error(err);
    },
  });

  const onCheckout = () => {
    const lineProducts = products.map((p) => ({
      price: p.product.priceId,
      quantity: p.quantity,
    }));

    checkout({ items: lineProducts });
  };
  return (
    <div
      className={twMerge(
        "flex flex-col p-4 md:p-6 rounded-md border border-whiteGray3",
        className
      )}
    >
      <p className="button-large">{data.heading}</p>
      <fieldset className="gap-3 flex flex-col mt-4">
        {data.shippingOptions.map((option) => (
          <div
            key={option.name}
            className={`flex px-4 py-[13px] border ${
              activeOption === option.price
                ? "border-darkGray"
                : "border-whiteGray3"
            } rounded gap-3 items-center`}
          >
            <Input
              type="radio"
              id={option.name}
              label={option.name}
              value={option.price}
              className="accent-darkGray cursor-pointer"
              onChange={onOptionChange}
              checked={activeOption === option.price}
            />
            <label
              htmlFor={option.name}
              className="flex gap-2 justify-between items-center w-full text"
            >
              {option.name}
              <span className="ml-auto">{formatPrice(option.price)}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <p className="flex items-center justify-between mt-[29px] py-[13px]">
        <span className="text">{data.subtotalText}</span>
        <span className="text font-semibold">
          {formatPrice(getProductsPrice(products))}
        </span>
      </p>
      <p className="flex items-center justify-between py-[13px] border-t border-whiteGray3 border-opacity-60">
        <span className="text text-lg font-semibold leading-[30px]">
          {data.totalText}
        </span>
        <span className="text text-lg font-semibold leading-[30px]">
          {formatPrice(getTotalPrice())}
        </span>
      </p>
      <Button className="mt-6 md:mt-8" rounded onClick={onCheckout}>
        {data.btnText}
      </Button>
    </div>
  );
};

export default CartSummary;
