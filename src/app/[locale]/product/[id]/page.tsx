import * as React from "react";
import { notFound } from "next/navigation";

import prisma from "@/../prisma/client";
import { Product, Review } from "@prisma/client";

import { Categories, GenderPlurals } from "@/app/_helpers/constants";

import Rating from "@/app/_components/Rating";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import ProductTabs from "./ProductTabs";
import ProductGallery from "./ProductGallery";
import SelectAndBuy from "./SelectAndBuy";
import IconsBar from "./IconsBar";

import { formatPrice } from "@/app/_helpers";

interface Props {
  params: { id: string; locale: string };
}

const ProductPage = async ({ params }: Props) => {
  const id = params.id;

  const product = await prisma.product.findUnique({
    where: { id },
  });
  const modelProducts: Product[] = await prisma.product.findMany({
    where: { modelId: product?.modelId },
  });

  if (!product) {
    return notFound();
  }

  const genderPlural = GenderPlurals[product.gender];
  const category = Categories[product.category];

  const breadcrumbsData = [
    { text: "Home", link: "/" },
    {
      text: genderPlural,
      link: `/${genderPlural.toLowerCase()}`,
    },
    {
      text: `${category}`,
      link: `/${genderPlural.toLowerCase()}/${category.toLowerCase()}`,
    },
  ];

  const descriptionLocalized =
    params.locale === "en" ? product.descriptionEN : product.descriptionPL;

  const productVariants = [product].concat(
    // current product variant is always first
    modelProducts.filter((item) => item.id !== product.id)
  );

  return (
    <div className="wrapper flex flex-col mt-8 mb-8 gap-y-[110px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[82px]">
        <ProductGallery data={product} className="max-sm:-mx-4" />
        <div className="flex flex-col gap-4">
          <Breadcrumbs data={breadcrumbsData} />
          <p className="font-display text-[34px] leading-[38px] font-normal -tracking-[0.6px] mt-4">
            {product.brand}
          </p>
          <p className="font-display text-[34px] leading-[38px] font-medium -tracking-[0.6px]">
            {product.name}
          </p>
          <Rating rate={product.rating} className="mt-4" />
          <p className="flex gap-3 text-lg items-center mt-4">
            <span className="block font-bold font-display text-[26px]">
              {formatPrice(product.price)}
            </span>
            <span className="block line-through opacity-70 font-display text-base">
              {formatPrice(product.oldPrice)}
            </span>
          </p>
          <SelectAndBuy product={product} productVariants={productVariants} />
          <IconsBar />
        </div>
      </div>
      <div className="w-full">
        <ProductTabs productData={product} aboutData={descriptionLocalized} />
      </div>
    </div>
  );
};

export default ProductPage;
