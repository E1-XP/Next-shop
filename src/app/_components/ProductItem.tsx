"use client";

import { Product, Review } from "@prisma/client";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useLocale } from "next-intl";
import Skeleton from "react-loading-skeleton";

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

  const [currImage, setcurrImage] = React.useState(product.images[0]);

  const transformUrl = (url: string) => {
    const splitBy = "/upload/";
    const twoParts = url.split(splitBy);

    return twoParts[0].concat(splitBy, "h_500/", twoParts[1]);
  };

  return (
    <div
      className={twMerge("relative", className)}
      onMouseMove={() => setcurrImage(product.images[1])}
      onMouseLeave={() => setcurrImage(product.images[0])}
    >
      <Image
        src={transformUrl(currImage)}
        alt={product.name}
        width={640}
        height={800}
        placeholder="blur"
      />
      <div className="py-4 px-2 flex flex-col gap-2">
        <p>{product.brand}</p>
        <p className="truncate">{product.name}</p>
        <p className="flex gap-2 justify-between text-lg">
          {productPrices.price ? (
            <span className="font-bold font-display">
              {formatPrice(
                productPrices.price,
                currency,
                locale as (typeof locales)[number]
              )}
            </span>
          ) : (
            <Skeleton containerClassName="w-[70px]" />
          )}
          {productPrices.oldPrice ? (
            <span className="hidden md:block line-through opacity-70 font-display">
              {formatPrice(
                productPrices.oldPrice,
                currency,
                locale as (typeof locales)[number]
              )}
            </span>
          ) : (
            <Skeleton containerClassName="hidden md:block w-[70px]" />
          )}
        </p>
      </div>
      <Link
        href={`product/${product.id}`}
        className="absolute top-0 left-0 right-0 bottom-0"
        aria-label={`${product.brand} - ${product.name}`}
      />
    </div>
  );
};

export default ProductItem;
