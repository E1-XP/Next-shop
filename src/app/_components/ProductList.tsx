"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { Product } from "@prisma/client";
import ProductItem from "./ProductItem";
import { useGlobalStore } from "../_store/global";
import { useHydrate } from "../_hooks/useHydrate";
import { trpc } from "../_trpc/client";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const t = useTranslations("components.ProductList");
  const { currency } = useGlobalStore();
  useHydrate();

  const data = {
    heading: t("heading"),
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
      <div className="flex items-center justify-between mx-auto">
        <h2 className="heading-2">{data.heading}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-center">
        {products.length
          ? products.map((product, i) => (
              <ProductItem
                key={i}
                product={product}
                productPrices={productsWithPrices[i]}
              />
            ))
          : data.noProductsText}
      </div>
    </section>
  );
};

export default ProductList;
