"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useLocale, useTranslations } from "next-intl";

import QuantityInput from "@/app/_components/QuantityInput";
import TrashIcon from "@/app/_components/icons/Trash";

import { locales } from "@/app/_helpers/constants";
import { formatPrice } from "@/app/_helpers";

import { useCartStore } from "@/app/_store/cart";
import { useHydrate } from "@/app/_hooks/useHydrate";
import { useGlobalStore } from "@/app/_store/global";

import { trpc } from "@/app/_trpc/client";

interface Props {
  className?: string;
}

const ProductTable = ({ className }: Props) => {
  const t = useTranslations("Cart.ProductTable");
  const locale = useLocale();

  const { products, removeProduct } = useCartStore();
  const { currency } = useGlobalStore();
  useHydrate();

  const tableData = {
    headers: [t("headers.0"), t("headers.1"), t("headers.2"), t("headers.3")],
    placeholderText: t("placeholderText"),
    removeBtnText: t("removeBtnText"),
    sizeText: t("sizeText"),
    colorText: t("colorText"),
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
              <span className="sm:hidden">s</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={!products.length ? "h-[136px]" : ""}>
        {products.length ? (
          products.map(({ product, quantity, size }, i) => (
            <tr
              key={`${product.id} ${size}`}
              className="border-b first:border-t border-whiteGray3 py-4 flex justify-between items-center gap-2"
            >
              <th
                scope="row"
                className="text-darkGray whitespace-nowrap flex gap-4 max-sm:w-full sm:basis-2/5"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="group flex-shrink-0"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={200}
                    height={400}
                    className="h-[100px] w-auto group-hover:opacity-90 transition"
                  />
                </Link>
                <div className="flex sm:flex-col gap-2 justify-between sm:justify-center w-full shrink min-w-0">
                  <div className="flex flex-col gap-2 truncate">
                    <Link
                      href={`/product/${product.id}`}
                      className="truncate block"
                    >
                      <p className="text font-semibold text-sm leading-[22px] truncate">
                        {product.name}
                      </p>
                    </Link>
                    <p className="text font-normal text-sm leading-[20px] truncate">
                      {tableData.sizeText} {size.toUpperCase()}
                      {", "}
                      {tableData.colorText}: TODO
                    </p>
                    <QuantityInput
                      product={product}
                      size={size}
                      variant="sm"
                      className="bg-white border border-whiteGray3 rounded sm:hidden"
                    />
                  </div>
                  <div className="gap-2 flex flex-col items-end sm:items-start">
                    <span className="sm:hidden">
                      {formatPrice(
                        productsWithPrices[i].price ?? 0,
                        currency,
                        locale as (typeof locales)[number]
                      )}
                    </span>
                    <button
                      className="flex items-center button-xsmall hover:opacity-70 transition gap-1"
                      onClick={() =>
                        removeProduct({ id: product.id, size }, true)
                      }
                    >
                      <TrashIcon className="stroke-grayWhite w-[18px] h-[18px] shrink-0" />
                      <span className="hidden sm:block">
                        {tableData.removeBtnText}
                      </span>
                    </button>
                  </div>
                </div>
              </th>
              <td className="hidden sm:block">
                <QuantityInput
                  product={product}
                  size={size}
                  variant="sm"
                  className="bg-white border border-whiteGray3 rounded"
                />
              </td>
              <td className="text text-lg leading-[30px] w-[68px] hidden sm:block">
                {formatPrice(
                  productsWithPrices[i].price ?? 0,
                  currency,
                  locale as (typeof locales)[number]
                )}
              </td>
              <td className="pr-0 text text-lg leading-[30px] font-semibold max-md:hidden">
                {formatPrice(
                  productsWithPrices[i].price ?? 0,
                  currency,
                  locale as (typeof locales)[number]
                )}
              </td>
            </tr>
          ))
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
