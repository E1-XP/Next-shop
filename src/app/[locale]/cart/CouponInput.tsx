import * as React from "react";
import Input from "@/app/_components/Input";

interface Props {
  className?: string;
}
const CouponInput = ({ className }: Props) => {
  const data = {
    heading: "Have a coupon?",
    paragraph: "Add your code for an instant cart discount",
    inputPlaceholder: "Enter code",
    inputLabel: "Coupons",
    inputBtnText: "Apply",
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