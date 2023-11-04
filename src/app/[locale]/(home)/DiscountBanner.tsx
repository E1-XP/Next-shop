"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

import image from "@/../public/images/nick-de-partee-5dlboex99cs-unsplash-653fe611150ca.webp";
import CopyIcon from "@/app/_components/icons/Copy";

const DiscountBanner = () => {
  const t = useTranslations("Home.DiscountBanner");

  const data = {
    heading: t("heading"),
    paragraph: t("paragraph"),
    couponCode: "SUMMER20",
    copiedToastText: t("copiedToastText"),
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(data.couponCode);
    toast.info(data.copiedToastText);
  };

  return (
    <div className="bg-darkGray h-[600px]">
      <div className="wrapper px-0 relative h-full">
        <Image
          alt="clothing store"
          src={image}
          className="w-full object-cover h-full max-md:object-[100%_0%]"
        />
        <div className="wrapper absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-max p-8 md:p-16 rounded-md flex flex-col gap-6 shadow-md max-w-[90%]">
          <h2 className="heading-3 md:headng-2 text-center">{data.heading}</h2>
          <p className="paragraph">{data.paragraph}</p>
          <div className="border-grayWhite border border-dashed rounded-lg flex gap-3 items-center justify-center p-2 px-4 w-min self-center">
            <span className="heading-5 text-xl text-grayWhite font-body">
              {data.couponCode}
            </span>
            <button
              aria-label="Copy discount code"
              className="hover:opacity-70 transition"
              onClick={onCopyClick}
            >
              <CopyIcon className="stroke-darkGray" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
