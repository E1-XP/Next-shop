import * as React from "react";
import { useTranslations } from "next-intl";

import ScrollableSlider from "../../_components/ScrollableSlider";
import ProductList from "@/app/_components/ProductList";

import { Product } from "@prisma/client";

export const NewArrivalsSlider = ({ products }: { products: Product[] }) => {
  const t = useTranslations("Home.sliders");

  const data = { heading: t("0.heading") };

  return <ScrollableSlider products={products} heading={data.heading} />;
};

export const SummerCollectionSlider = ({
  products,
}: {
  products: Product[];
}) => {
  const t = useTranslations("Home.sliders");

  const data = { heading: t("1.heading"), paragraph: t("1.paragraph") };

  return (
    <ScrollableSlider
      products={products}
      heading={data.heading}
      paragraph={data.paragraph}
      bgColor="#FFC107"
    />
  );
};

export const PopularProducts = ({ products }: { products: Product[] }) => {
  const t = useTranslations("Home");

  return (
    <ProductList
      heading={t("productListHeading")}
      products={products
        .concat(...products, ...products)
        .filter((_, i) => i < 10)}
    />
  );
};
