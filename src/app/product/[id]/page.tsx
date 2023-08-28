import * as React from "react";
import { notFound } from "next/navigation";
import { PageProps } from "../../../../.next/types/app/page";

import prisma from "@/../prisma/client";
import { Product } from "@prisma/client";

import { Categories, GenderPlurals } from "@/app/constants";

import Rating from "@/app/components/Rating";
import Button from "@/app/components/Button";
import QuantityInput from "@/app/components/QuantityInput";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ColorSelector from "@/app/components/ColorSelector";
import SizeSelector from "@/app/components/SizeSelector";

import HeartIcon from "@/app/components/icons/Heart";
import QuestionCircleIcon from "@/app/components/icons/QuestionCircle";
import ShareIcon from "@/app/components/icons/Share";

const ProductPage = async ({ params }: PageProps) => {
  const modelProducts: Product[] = await prisma.product.findMany({
    where: { modelId: params.id },
  });

  const product = modelProducts.find((product) => product.id);

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
    // current product is always first
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
  };

  return (
    <div className="wrapper flex flex-wrap">
      <div className="basis-3/5">gal</div>
      <div className="basis-2/5">
        <Breadcrumbs data={breadcrumbsData} />
        <p>{product?.brand}</p>
        <p>{product?.name}</p>
        <Rating rate={product.rating} />
        <p className="flex gap-3 text-lg">
          <span className="font-bold font-display">${product.price}</span>
          <span className="line-through opacity-70 font-display">
            ${product.oldPrice}
          </span>
        </p>
        <ColorSelector data={colorData} />
        <SizeSelector />
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
      <div className="w-full">txt</div>
    </div>
  );
};

export default ProductPage;
