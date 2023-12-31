"use client";

import * as React from "react";
import Stripe from "stripe";
import { useLocale, useTranslations } from "next-intl";
import { notFound } from "next/navigation";

import { Product, Review } from "@prisma/client";

import ColorSelector from "@/app/_components/ColorSelector";
import QuantityInput from "@/app/_components/QuantityInput";
import SizeSelector, { sizeKeys } from "@/app/_components/SizeSelector";
import Rating from "@/app/_components/Rating";
import AddToCartButton from "./AddToCartButton";

import { calculateRating, formatPrice } from "@/app/_helpers";
import { useHydrate } from "@/app/_hooks/useHydrate";
import { useGlobalStore } from "@/app/_store/global";
import { locales } from "@/app/_helpers/constants";
import { trpc } from "@/app/_trpc/client";

interface Props {
  product: Product;
  productVariants: Product[];
  productPrices: Stripe.Price[];
}

const ProductDetails = ({ product, productVariants, productPrices }: Props) => {
  const t = useTranslations("Product");

  const locale = useLocale();
  const { currency } = useGlobalStore();
  useHydrate();

  const productReviews =
    trpc.review.get.useQuery({ productId: product.id }).data || [];

  const [quantity, setQuantity] = React.useState(1);
  const [size, selectSize] = React.useState<sizeKeys | undefined>(undefined);

  const resetSize = () => selectSize(undefined);
  const resetQuantity = () => setQuantity(1);

  const isUSD = currency === "usd";

  const price = productPrices.find(
    (price) => price.id === (isUSD ? product?.priceUSDId : product?.pricePLNId)
  );

  const oldPrice = productPrices.find(
    (price) =>
      price.id === (isUSD ? product?.oldPriceUSDId : product?.oldPricePLNId)
  );

  if (!price) {
    return notFound();
  }

  return (
    <>
      <div className="flex gap-2 items-center mt-4">
        <Rating rate={calculateRating(productReviews)} />
        <span className="block paragraph">
          ({productReviews.length || ""}{" "}
          {t("ratingCount", { count: productReviews.length })})
        </span>
      </div>
      <p className="flex gap-3 text-lg items-center mt-4">
        <span className="block font-bold font-display text-[26px]">
          {formatPrice(
            price.unit_amount!,
            currency,
            locale as (typeof locales)[number]
          )}
        </span>
        <span className="block line-through opacity-70 font-display text-base">
          {formatPrice(
            oldPrice?.unit_amount!,
            currency,
            locale as (typeof locales)[number]
          )}
        </span>
      </p>
      <ColorSelector data={productVariants} className="mt-4" />
      <SizeSelector
        product={product}
        className="mt-4"
        outsideControl={[size, selectSize]}
      />
      <QuantityInput
        className="w-full mt-4"
        product={product}
        outsideControl={[quantity, setQuantity]}
        isSizeSelected={size !== undefined}
        size={size}
      />
      <AddToCartButton
        product={product}
        quantity={quantity}
        isSizeSelected={size !== undefined}
        size={size}
        resetSize={resetSize}
        resetQuantity={resetQuantity}
      />
    </>
  );
};

export default ProductDetails;
