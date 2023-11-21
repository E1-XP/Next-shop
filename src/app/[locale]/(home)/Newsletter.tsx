"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import Input from "@/app/_components/Input";

const NewsletterSection = () => {
  const t = useTranslations("Home.Newsletter");

  const data = {
    heading: t("heading"),
    paragraph: t("paragraph"),
    inputPlaceholder: t("inputPlaceholder"),
    inputLabel: t("inputLabel"),
    inputBtnText: t("inputBtnText"),
  };

  const onSubmit = () => {
    toast.info("This feature is not yet implemented.");
  };

  return (
    <section className="bg-whiteGray pt-[140px] pb-[132px]">
      <div className="flex flex-col wrapper max-w-[488px] mx-auto items-center">
        <h2 className="heading-2">{data.heading}</h2>
        <p className="paragraph text-lg mt-2">{data.paragraph}</p>
        <Input
          placeholder={data.inputPlaceholder}
          withSubmitButtonContent={() => data.inputBtnText}
          className="mt-8 w-full"
          label={data.inputLabel}
          id={data.inputLabel}
          onClick={onSubmit}
        />
      </div>
    </section>
  );
};

export default NewsletterSection;
