"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import * as React from "react";
import Rating from "./Rating";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useLocale } from "next-intl";

import { formatPrice } from "../_helpers";
import { useGlobalStore } from "../_store/global";
import { useHydrate } from "../_hooks/useHydrate";
import { locales } from "../_helpers/constants";

interface Prices {
  price: number;
  oldPrice: number;
}
interface Props {
  product: Product;
  productPrices: Prices;
  className?: string;
}

const ProductItem = ({ product, productPrices, className }: Props) => {
  const locale = useLocale();
  const { currency } = useGlobalStore();
  useHydrate();

  return (
    <div className={twMerge("relative group", className)}>
      <Image
        src={product.images[0]}
        alt={product.name}
        width={640}
        height={800}
        className="transition group-hover:opacity-90"
      />
      <div className="py-4 px-2 flex flex-col gap-2">
        <Rating rate={product.rating} />
        <p>{product.brand}</p>
        <p className="truncate">{product.name}</p>
        <p className="flex gap-3 text-lg">
          <span className="font-bold font-display">
            {formatPrice(
              productPrices.price ?? 0,
              currency,
              locale as (typeof locales)[number]
            )}
          </span>
          <span className="line-through opacity-70 font-display">
            {formatPrice(
              productPrices.oldPrice ?? 0,
              currency,
              locale as (typeof locales)[number]
            )}
          </span>
        </p>
      </div>
      <Link
        href={`product/${product.id}`}
        className="absolute top-0 left-0 right-0 bottom-0"
      />
    </div>
  );
};

export default ProductItem;
