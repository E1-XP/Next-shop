import * as React from "react";
import { useTranslations } from "next-intl";
import Button from "../_components/Button";

const ErrorPage = () => {
  const t = useTranslations("NotFound");

  const data = {
    heading: "Page not found",
    text: "Nothing found at this address. This page may have been moved or permanently deleted. Please double-check that this link is correct, go back or click below to return to the home page.",
    btnText: "Return to main page",
    href: "/",
  };

  return (
    <div className="wrapper flex flex-col grow justify-center gap-[52px] py-[52px]">
      <header className="flex justify-center flex-col">
        <h2 className="heading-2 md:heading-1 text-center">{data.heading}</h2>
      </header>
      <div className="flex flex-col gap-24">
        <p className="text-lg font-normal font-body leading-[30px] max-w-[750px]">
          {data.text}
        </p>
        <Button className="self-center" rounded asLink href={data.href}>
          {data.btnText}
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
