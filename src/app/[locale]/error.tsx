"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

const ErrorPage = () => {
  const t = useTranslations("ErrorPage");

  const data = {
    heading: t("heading"),
    text: t("text"),
  };

  return (
    <div className="wrapper flex flex-col grow gap-[75px] py-[52px]">
      <header className="flex justify-center flex-col">
        <h2 className="heading-2 md:heading-1 text-center">{data.heading}</h2>
      </header>
      <div className="flex flex-col gap-24 items-center">
        <p className="text-lg font-normal font-body leading-[30px] max-w-[750px]">
          {data.text}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
