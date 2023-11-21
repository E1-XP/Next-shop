import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

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

  const onSubmit = () => {
    toast.info("This feature is not yet implemented.");
  };

  return (
    <div className={className}>
      <p className="button-large">{data.heading}</p>
      <p className="paragraph text-grayWhite mt-[7px]">{data.paragraph}</p>
      <Input
        className="mt-4"
        placeholder={data.inputPlaceholder}
        withSubmitButtonContent={() => data.inputBtnText}
        label={data.inputLabel}
        id={data.inputLabel}
        onClick={onSubmit}
      />
    </div>
  );
};

export default CouponInput;
