"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useLocale, useTranslations } from "next-intl";

import QuantityInput from "@/app/_components/QuantityInput";
import TrashIcon from "@/app/_components/icons/Trash";

import { formatPrice } from "@/app/_helpers";
import { locales } from "@/app/_helpers/constants";
import { CartItem, useCartStore } from "@/app/_store/cart";
import { useGlobalStore } from "@/app/_store/global";

interface Props {
  product: CartItem;
  productPrice: number;
}

const ProductRow = ({ product: data, productPrice }: Props) => {
  const { product, size, quantity } = data;

  const t = useTranslations("Cart.ProductTable");
  const locale = useLocale();

  const { removeProduct } = useCartStore();
  const { currency } = useGlobalStore();

  const tableData = {
    removeBtnText: t("removeBtnText"),
    sizeText: t("sizeText"),
    colorText: t("colorText"),
  };

  return (
    <tr
      key={`${product.id} ${size}`}
      className="border-b first:border-t border-whiteGray3 py-4 flex justify-between items-center gap-2"
    >
      <th
        scope="row"
        className="text-darkGray whitespace-nowrap flex gap-4 max-sm:w-full sm:basis-2/5"
      >
        <Link href={`/product/${product.id}`} className="group flex-shrink-0">
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
            <Link href={`/product/${product.id}`} className="truncate block">
              <p className="text font-semibold text-sm leading-[22px] truncate">
                {product.name}
              </p>
            </Link>
            <p className="text font-normal text-sm leading-[20px] truncate flex items-center">
              {tableData.sizeText} {size.toUpperCase()}
              {", "}
              {tableData.colorText}:{" "}
              <span
                className="ml-2 block w-4 h-4 border border-darkGray2 rounded-full"
                style={{ backgroundColor: product.color }}
              />
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
              {productPrice ? (
                formatPrice(
                  productPrice,
                  currency,
                  locale as (typeof locales)[number]
                )
              ) : (
                <Skeleton className="w-[60px]" />
              )}
            </span>
            <button
              className="flex items-center button-xsmall hover:opacity-70 transition gap-1"
              onClick={() => removeProduct({ id: product.id, size }, true)}
            >
              <TrashIcon className="stroke-grayWhite w-[18px] h-[18px] shrink-0" />
              <span className="hidden sm:block">{tableData.removeBtnText}</span>
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
        {productPrice ? (
          formatPrice(
            productPrice,
            currency,
            locale as (typeof locales)[number]
          )
        ) : (
          <Skeleton className="w-[60px]" />
        )}
      </td>
      <td className="pr-0 text text-lg leading-[30px] font-semibold max-md:hidden">
        {productPrice ? (
          formatPrice(
            productPrice * quantity,
            currency,
            locale as (typeof locales)[number]
          )
        ) : (
          <Skeleton className="w-[60px]" />
        )}
      </td>
    </tr>
  );
};

export const SkeletonRow = () => (
  <tr className="border-b first:border-t border-whiteGray3 py-4 flex justify-between items-center gap-2">
    <th
      scope="row"
      className="text-darkGray whitespace-nowrap flex gap-4 max-sm:w-full sm:basis-2/5"
    >
      <Link href={"#"} className="group flex-shrink-0">
        <Skeleton className="w-[70px] h-full" />
      </Link>
      <div className="flex sm:flex-col gap-2 justify-between sm:justify-center w-full shrink min-w-0">
        <div className="flex flex-col gap-2 truncate">
          <Link href="#" className="truncate block">
            <p className="text font-semibold text-sm leading-[22px] truncate">
              <Skeleton className="w-[120px]" />
            </p>
          </Link>
          <p className="text font-normal text-sm leading-[20px] truncate flex items-center gap-2">
            <Skeleton className="w-[100px]" />
            <Skeleton className="w-[15px]" borderRadius={999} />
          </p>
          <Skeleton className="w-[70px]" containerClassName="sm:hidden" />
        </div>
        <div className="gap-2 flex flex-col items-end sm:items-start">
          <span className="sm:hidden">
            <Skeleton className="w-[70px]" containerClassName="sm:hidden" />
          </span>
          <Skeleton className="w-[90px]" />
        </div>
      </div>
    </th>
    <td className="hidden sm:block">
      <Skeleton className="w-[90px]" />
    </td>
    <td className="text text-lg leading-[30px] w-[68px] hidden sm:block">
      <Skeleton className="w-[70px]" />
    </td>
    <td className="pr-0 text text-lg leading-[30px] font-semibold max-md:hidden">
      <Skeleton className="w-[70px]" />
    </td>
  </tr>
);

export default ProductRow;
