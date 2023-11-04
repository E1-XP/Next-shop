"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import { useCartStore } from "@/app/_store/cart";
import { useHydrate } from "@/app/_hooks/useHydrate";
import { useGlobalStore } from "@/app/_store/global";

import { trpc } from "@/app/_trpc/client";

import ProductRow, { SkeletonRow } from "./ProductRow";

interface Props {
  className?: string;
}

const ProductTable = ({ className }: Props) => {
  const t = useTranslations("Cart.ProductTable");

  const { products } = useCartStore();
  const { currency } = useGlobalStore();
  const isHydrating = useHydrate();

  const tableData = {
    headers: [t("headers.0"), t("headers.1"), t("headers.2"), t("headers.3")],
    placeholderText: t("placeholderText"),
  };

  const isUSD = currency === "usd";

  const prices =
    trpc.payment.getPrices.useQuery({
      stripeId: products.map((p) => p.product.stripeId),
    }).data ?? [];

  const productsWithPrices = products.map(({ product }) => {
    const price = prices.find(
      (price) =>
        price.id === (isUSD ? product?.priceUSDId : product?.pricePLNId)
    );

    return {
      price: price?.unit_amount!,
    };
  });

  return (
    <table
      className={twMerge(
        "w-full text-sm text-left text-darkGray table-auto",
        className
      )}
    >
      <thead className="text-xs text-darkGray">
        <tr className="[&>*:nth-child(2)]:max-md:hidden [&>*:nth-child(2)]:w-[84px] [&>*:nth-child(3)]:w-[68px] flex justify-between items-center">
          {tableData.headers.map((header) => (
            <th
              key={header}
              scope="col"
              className="py-3 first:basis-2/5 button-small max-sm:hidden first:block"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={!products.length ? "h-[136px]" : ""}>
        {products.length ? (
          products.map((product, i) => (
            <ProductRow
              key={i}
              product={product}
              productPrice={productsWithPrices[i].price}
            />
          ))
        ) : isHydrating ? (
          Array(3)
            .fill(null)
            .map((_, i) => <SkeletonRow key={i} />)
        ) : (
          <tr className="border-b first:border-t border-whiteGray3 py-4 flex justify-between items-center gap-2">
            <th className="text-darkGray whitespace-nowrap flex gap-4 justify-center items-center w-full h-[136px]">
              {tableData.placeholderText}
            </th>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
