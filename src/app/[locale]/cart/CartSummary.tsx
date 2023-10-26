"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";

import { formatPrice, getProductsPrice } from "@/app/_helpers";
import { locales } from "@/app/_helpers/constants";

import { useCartStore } from "@/app/_store/cart";
import { useGlobalStore } from "@/app/_store/global";
import { useHydrate } from "@/app/_hooks/useHydrate";
import { trpc } from "@/app/_trpc/client";

interface Props {
  className?: string;
}

const CartSummary = ({ className }: Props) => {
  const t = useTranslations("Cart.CartSummary");
  const router = useRouter();
  const locale = useLocale();
  const session = useSession();

  const { products } = useCartStore();
  const { currency } = useGlobalStore();
  const isHydrating = useHydrate();

  const isAuthenticated = session.status === "authenticated";
  const isUSD = currency === "usd";

  const data = {
    heading: t("heading"),
    shippingOptions: [
      {
        name: t("shippingOptions.0.name"),
        price: 0,
        stripeId: "shr_1O3i5KEl9PJWMc3qDttbJZuh",
      },
      {
        name: t("shippingOptions.1.name"),
        price: isUSD ? 500 : 1500,
        stripeId: "shr_1O3i5tEl9PJWMc3qmeUdOZpN",
      },
    ],
    subtotalText: t("subtotalText"),
    totalText: t("totalText"),
    btnText: t("btnText"),
    toastNotAuthenticated: t("toastNotAuthenticated"),
  };

  const [activeOption, setActiveOption] = React.useState(
    data.shippingOptions[0]
  );

  const prices =
    trpc.payment.getPrices.useQuery({
      stripeId: products.map((p) => p.product.stripeId),
    }).data ?? [];

  const productsWithPrices = products.map(({ quantity, product }) => {
    const price = prices.find(
      (price) =>
        price.id === (isUSD ? product?.priceUSDId : product?.pricePLNId)
    );

    return {
      price: price?.unit_amount!,
      quantity,
    };
  });

  const getTotalPrice = () =>
    getProductsPrice(productsWithPrices) + activeOption.price;

  const onOptionChange = (idx: number) => {
    setActiveOption(data.shippingOptions[idx]);
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
    if (!isAuthenticated) {
      return toast.info(data.toastNotAuthenticated);
    }

    const lineProducts = products.map((p) => ({
      price: isUSD ? p.product.priceUSDId : p.product.pricePLNId,
      quantity: p.quantity,
    }));

    checkout({
      items: lineProducts,
      currency,
      stripeShippingOptionId: activeOption.stripeId,
      locale,
    });
  };

  const isLoadingPrices = isHydrating || (products.length && !prices.length);

  return (
    <div
      className={twMerge(
        "flex flex-col p-4 md:p-6 rounded-md border border-whiteGray3",
        className
      )}
    >
      <p className="button-large">{data.heading}</p>
      <fieldset className="gap-3 flex flex-col mt-4">
        {data.shippingOptions.map((option, idx) => (
          <div
            key={option.name}
            className={`flex px-4 py-[13px] border ${
              activeOption.price === option.price
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
              onChange={() => onOptionChange(idx)}
              checked={activeOption.price === option.price}
            />
            <label
              htmlFor={option.name}
              className="flex gap-2 justify-between items-center w-full text"
            >
              {option.name}
              <span className="ml-auto">
                {!isHydrating ? (
                  formatPrice(
                    option.price,
                    currency,
                    locale as (typeof locales)[number]
                  )
                ) : (
                  <Skeleton className="w-[70px]" />
                )}
              </span>
            </label>
          </div>
        ))}
      </fieldset>
      <p className="flex items-center justify-between mt-[29px] py-[13px]">
        <span className="text">{data.subtotalText}</span>
        <span className="text font-semibold">
          {!isLoadingPrices ? (
            formatPrice(
              getProductsPrice(productsWithPrices),
              currency,
              locale as (typeof locales)[number]
            )
          ) : (
            <Skeleton className="w-[70px]" />
          )}
        </span>
      </p>
      <p className="flex items-center justify-between py-[13px] border-t border-whiteGray3 border-opacity-60">
        <span className="text text-lg font-semibold leading-[30px]">
          {data.totalText}
        </span>
        <span className="text text-lg font-semibold leading-[30px]">
          {!isLoadingPrices ? (
            formatPrice(
              getTotalPrice(),
              currency,
              locale as (typeof locales)[number]
            )
          ) : (
            <Skeleton className="w-[70px]" />
          )}
        </span>
      </p>
      <Button className="mt-6 md:mt-8" rounded onClick={onCheckout}>
        {data.btnText}
      </Button>
    </div>
  );
};

export default CartSummary;
