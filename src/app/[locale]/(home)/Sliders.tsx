import * as React from "react";
import { useTranslations } from "next-intl";

import ScrollableSlider from "./ScrollableSlider";

import { Product } from "@prisma/client";

export const NewArrivalsSlider = ({ products }: { products: Product[] }) => {
  const t = useTranslations("Home.sliders");

  const data = { heading: t("0.heading"), paragraph: t("0.paragraph") };

  return <ScrollableSlider data={products} heading={data.heading} />;
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
      data={products}
      heading={data.heading}
      paragraph={data.paragraph}
      bgColor="#FFC107"
    />
  );
};
