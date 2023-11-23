"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

import ProductItem from "./ProductItem";

import { useGlobalStore } from "../_store/global";
import { useHydrate } from "../_hooks/useHydrate";

import { trpc } from "../_trpc/client";
import { Product } from "@prisma/client";

interface Props {
  products: Product[];
  heading?: string;
  paragraph?: string;
  isLoading?: boolean;
}

const ProductList = ({
  products,
  heading,
  paragraph,
  isLoading = false,
}: Props) => {
  const t = useTranslations("components.ProductList");
  const { currency } = useGlobalStore();
  useHydrate();

  const data = {
    noProductsText: t("noProductsText"),
  };

  const isUSD = currency === "usd";

  const prices =
    trpc.payment.getPrices.useQuery({
      stripeId: products.map((p) => p.stripeId),
    }).data ?? [];

  const productsWithPrices = products.map((product) => {
    const price = prices.find(
      (price) =>
        price.id === (isUSD ? product?.priceUSDId : product?.pricePLNId)
    );

    const oldPrice = prices.find(
      (price) =>
        price.id === (isUSD ? product?.oldPriceUSDId : product?.oldPricePLNId)
    );

    return {
      price: price?.unit_amount!,
      oldPrice: oldPrice?.unit_amount!,
    };
  });

  return (
    <section className="wrapper flex flex-col gap-12 py-16">
      {heading && (
        <div className="flex flex-col gap-24 items-center justify-between mx-auto">
          <h2 className="heading-2">{heading}</h2>
          {paragraph && <p className="text">{paragraph}</p>}
        </div>
      )}
      <div
        className={twMerge(
          "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-center",
          isLoading ? "grid-rows-1 overflow-hidden auto-rows-[0px]" : ""
        )}
      >
        {products.length
          ? products.map((product, i) => (
              <ProductItem
                key={i}
                product={product}
                productPrices={productsWithPrices[i]}
              />
            ))
          : isLoading
          ? Array(5)
              .fill(null)
              .map((_, i) => (
                <div className="flex flex-col" key={i}>
                  <Skeleton className="aspect-[52/75]" />
                  <Skeleton className="w-28" />
                  <Skeleton className="w-40" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="w-14" />
                    <Skeleton className="w-14" />
                  </div>
                </div>
              ))
          : data.noProductsText}
      </div>
    </section>
  );
};

export default ProductList;
