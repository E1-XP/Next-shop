import * as React from "react";
import Input from "../components/Input";

const NewsletterSection = () => {
  const data = {
    heading: "Join Our Newsletter",
    paragraph: "Big discounts and right to your inbox.",
    inputPlaceholder: "Email address",
    inputBtnText: "Signup",
  };

  return (
    <section className="bg-whiteGray pt-[140px] pb-[132px]">
      <div className="flex flex-col wrapper max-w-[488px] mx-auto items-center">
        <h2 className="heading-2">{data.heading}</h2>
        <p className="text text-lg mt-2">{data.paragraph}</p>
        <Input
          placeholder={data.inputPlaceholder}
          withSubmitButton={data.inputBtnText}
          className="mt-8 w-full"
        />
      </div>
    </section>
  );
};

export default NewsletterSection;
