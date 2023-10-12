import * as React from "react";
import { useTranslations } from "next-intl";

import Input from "@/app/_components/Input";

interface Props {
  className?: string;
}
const CouponInput = ({ className }: Props) => {
  const t = useTranslations("Cart.CouponInput");

  const data = {
    heading: t("heading"),
    paragraph: t("paragraph"),
    inputPlaceholder: t("inputPlaceholder"),
    inputLabel: t("inputLabel"),
    inputBtnText: t("inputBtnText"),
  };

  return (
    <div className={className}>
      <p className="button-large">{data.heading}</p>
      <p className="text text-grayWhite mt-[7px]">{data.paragraph}</p>
      <Input
        className="mt-4"
        placeholder={data.inputPlaceholder}
        withSubmitButton={data.inputBtnText}
        label={data.inputLabel}
        id={data.inputLabel}
      />
    </div>
  );
};

export default CouponInput;
