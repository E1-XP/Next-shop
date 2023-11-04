import * as React from "react";
import { useTranslations } from "next-intl";
import Button from "../_components/Button";

const NotFoundPage = () => {
  const t = useTranslations("NotFound");

  const data = {
    heading: t("heading"),
    text: t("text"),
    btnText: t("btnText"),
    href: "/",
  };

  return (
    <div className="wrapper flex flex-col grow gap-[75px] py-[52px]">
      <header className="flex justify-center flex-col">
        <h2 className="heading-2 md:heading-1 text-center">{data.heading}</h2>
      </header>
      <div className="flex flex-col gap-24 items-center">
        <p className="text-lg font-normal font-body leading-[30px] content">
          {data.text}
        </p>
        <Button className="self-center" rounded asLink href={data.href}>
          {data.btnText}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
