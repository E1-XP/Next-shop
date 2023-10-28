"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import { Product, Review } from "@prisma/client";

import ReviewsList from "./ReviewsList";
import { trpc } from "@/app/_trpc/client";

interface Props {
  className?: string;
  productData: Product;
  aboutData: string;
}

const ProductTabs = ({ className, aboutData, productData }: Props) => {
  const t = useTranslations("Product.Tabs");

  const tabs = [
    { tabName: t("0.tabName") },
    {
      tabName: t("1.tabName"),
    },
  ];

  const getReviews = trpc.review.get.useQuery({ productId: productData?.id });
  const productReviews =
    getReviews.data?.map((r) => ({
      ...r,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
    })) || [];

  const data: [string, Review[]] = [aboutData, productReviews];

  const [activeTabIdx, setActiveTabIdx] = React.useState(0);
  const activeTabItem = data[activeTabIdx];

  return (
    <div
      className={twMerge("flex max-md:gap-8 flex-col md:flex-row", className)}
    >
      <div className="basis-1/5 flex flex-row md:flex-col gap-6">
        {tabs.map((tab, i) => (
          <button
            key={tab.tabName}
            className={twMerge(
              "w-min font-display text-xl font-medium leading-7 pb-1 hover:text-darkGray2",
              activeTabIdx === i
                ? "border-b  border-darkGray2 text-darkGray2"
                : "text-grayWhite"
            )}
            onClick={() => setActiveTabIdx(i)}
          >
            {tab.tabName}
          </button>
        ))}
      </div>
      <div className="basis-4/5 relative min-h-[320px] overflow-hidden">
        <div // duplicated active slide to maintain container height of absolute positioned tabs
          aria-hidden="true"
          className="bg-white whitespace-pre-wrap top-0 left-0 w-full transition text-lg font-normal font-body leading-[30px] flex flex-col gap-12 opacity-0"
        >
          {Array.isArray(activeTabItem) ? (
            <ReviewsList reviews={productReviews} product={productData} />
          ) : (
            activeTabItem
          )}
        </div>
        {data.map((content, i) => (
          <div
            key={i}
            className={twMerge(
              "bg-white whitespace-pre-wrap absolute top-0 left-0 w-full transition text-lg font-normal font-body leading-[30px] flex flex-col gap-12",
              i === activeTabIdx ? "opacity-100" : "opacity-0"
            )}
          >
            {Array.isArray(content) ? (
              <ReviewsList reviews={content} product={productData} />
            ) : (
              content
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTabs;
