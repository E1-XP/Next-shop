import * as React from "react";
import Input from "../components/Input";

interface Props {
  className?: string;
}
const CouponInput = ({ className }: Props) => {
  const data = {
    heading: "Have a coupon?",
    paragraph: "Add your code for an instant cart discount",
    inputPlaceholder: "Enter code",
    inputBtnText: "Apply",
  };

  return (
    <div className={className}>
      <h3 className="button-large">{data.heading}</h3>
      <p className="text text-grayWhite mt-[7px]">{data.paragraph}</p>
      <Input
        className="mt-4"
        placeholder={data.inputPlaceholder}
        withSubmitButton={data.inputBtnText}
      />
    </div>
  );
};

export default CouponInput;
