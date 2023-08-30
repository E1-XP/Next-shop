import * as React from "react";
import { notFound } from "next/navigation";

import prisma from "@/../prisma/client";
import { Product, Review } from "@prisma/client";

import { Categories, GenderPlurals } from "@/app/constants";

import Rating from "@/app/components/Rating";
import Button from "@/app/components/Button";
import QuantityInput from "@/app/components/QuantityInput";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ColorSelector from "@/app/components/ColorSelector";
import SizeSelector from "@/app/components/SizeSelector";
import ProductTabs from "@/app/components/ProductTabs";

import HeartIcon from "@/app/components/icons/Heart";
import QuestionCircleIcon from "@/app/components/icons/QuestionCircle";
import ShareIcon from "@/app/components/icons/Share";

interface Props {
  params: { id: string };
}

const ProductPage = async ({ params }: Props) => {
  const id = Number(params.id);

  const product = await prisma.product.findUnique({
    where: { id },
  });
  const modelProducts: Product[] = await prisma.product.findMany({
    where: { modelId: product?.modelId },
  });

  const productReviews: Review[] = await prisma.review.findMany({
    where: { productId: product?.id },
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

  const colorData = [product].concat(
    // current product variant is always first
    modelProducts.filter((item) => item.id !== product.id)
  );

  const data = {
    iconsBar: [
      {
        text: "Wishlist",
        icon: HeartIcon,
      },
      {
        text: "Ask question",
        icon: QuestionCircleIcon,
      },
      {
        text: "Share",
        icon: ShareIcon,
      },
    ],
    tabs: [
      { tabName: "Description", content: product.descriptionEN },
      {
        tabName: "Reviews",
        content: "No reviews found. Be the first to write one!",
      },
    ],
  };

  return (
    <div className="wrapper flex flex-wrap mt-8 mb-8 gap-y-[110px]">
      <div className="basis-3/5">gal</div>
      <div className="basis-2/5 flex flex-col gap-4">
        <Breadcrumbs data={breadcrumbsData} />
        <p className="font-display text-[34px] leading-[38px] font-normal -tracking-[0.6px]">
          {product.brand}
        </p>
        <p className="font-display text-[34px] leading-[38px] font-medium -tracking-[0.6px]">
          {product.name}
        </p>
        <Rating rate={product.rating} />
        <p className="flex gap-3 text-lg items-center">
          <span className="block font-bold font-display text-[26px]">
            ${product.price}
          </span>
          <span className="block line-through opacity-70 font-display text-base">
            ${product.oldPrice}
          </span>
        </p>
        <ColorSelector data={colorData} />
        <SizeSelector data={product} />
        <QuantityInput className="w-full" />
        <Button className="w-full">Add to Cart</Button>
        <div className="flex gap-4 md:gap-8">
          {data.iconsBar.map((item) => (
            <button
              key={item.text}
              className="flex gap-1 items-center font-display font-medium text-sm md:text-base leading-7 -tracking-[0.4px] hover:opacity-70 transition"
            >
              <item.icon className="w-[18px] h-[18px] md:h-5 md:w-5" />
              {item.text}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full">
        <ProductTabs data={data.tabs} />
      </div>
    </div>
  );
};

export default ProductPage;
