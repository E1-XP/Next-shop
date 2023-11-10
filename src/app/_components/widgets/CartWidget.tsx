"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Skeleton from "react-loading-skeleton";

import Widget from "./Base";
import Button from "../Button";
import ShoppingBagIcon from "../icons/ShoppingBag";

import { formatPrice, getProductsPrice } from "@/app/_helpers";
import { locales } from "@/app/_helpers/constants";

import { useCartStore } from "@/app/_store/cart";
import { useHydrate } from "@/app/_hooks/useHydrate";
import { useGlobalStore } from "@/app/_store/global";
import { trpc } from "@/app/_trpc/client";

const CartWidget = () => {
  const t = useTranslations("widgets.CartWidget");

  const router = useRouter();
  const locale = useLocale();

  const { products } = useCartStore();
  const { currency } = useGlobalStore();
  const isHydrating = useHydrate();

  const [isOpen, setIsOpen] = React.useState(false);

  const cartItemsCount = products.length;

  const isUSD = currency === "usd";

  const { data: pricesData, isFetching } = trpc.payment.getPrices.useQuery({
    stripeId: products.map((p) => p.product.stripeId),
  });

  const prices = pricesData ?? [];

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

  const totalCost = getProductsPrice(productsWithPrices);

  const data = {
    loadingText: t("loadingText"),
    header: t("header"),
    emptyCartText: t("emptyCartText"),
    btnText: t("btnText"),
    btnUrl: "/cart",
  };

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const onButtonClick = () => {
    router.push(data.btnUrl);

    toggleIsOpen();
  };

  return (
    <Widget
      referenceContent={() =>
        isHydrating ? (
          <Skeleton className="w-[56px] h-[26px]" borderRadius={999} />
        ) : (
          <>
            <ShoppingBagIcon className="stroke-darkGray group-hover:opacity-60 transition h-[24px] w-[24px]" />
            {!!cartItemsCount && (
              <span className="bg-darkGray text-white text-xs font-body font-medium px-[9px] py-0.5 rounded-full ml-2 h-5 group-hover:opacity-70">
                {cartItemsCount}
              </span>
            )}
          </>
        )
      }
    >
      <div className="flex justify-between items-center w-full">
        <p className="heading-5">{data.header}</p>
        <span className="heading-6 font-semibold">
          {isFetching ? (
            <Skeleton className="h-[26px] w-[56px]" />
          ) : (
            formatPrice(totalCost, currency, locale as (typeof locales)[number])
          )}
        </span>
      </div>
      {products.length ? (
        <div className="w-full">
          <ul className="flex flex-col max-h-[372.5px] overflow-y-scroll mini-scrollbar">
            {products.map(({ product, quantity, size }) => (
              <li
                key={`${product.id} ${size}`}
                className="flex justify-between gap-4 items-center border-b first:border-t border-whiteGray3 py-2.5 px-1"
              >
                <Image
                  src={product.images[0]}
                  alt={`${product.brand} ${product.name}`}
                  width={50}
                  height={100}
                />
                <div className="flex flex-col truncate mr-auto">
                  <span className="paragraph font-semibold text-sm leading-[22px] truncate">
                    {product.brand}
                  </span>
                  <span className="paragraph font-normal text-sm leading-[20px] truncate">
                    {product.name}
                  </span>
                </div>
                <span className="heading-6 font-semibold">x{quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="paragraph whitespace-nowrap truncate mt-auto mb-auto">
          {data.emptyCartText}
        </p>
      )}
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
