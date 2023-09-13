import * as React from "react";

import Button from "@/app/components/Button";
import Input, { Types } from "@/app/components/Input";
import Link from "next/link";
import Image from "next/image";

import img from "@/../public/images/wesley-tingey-JOhjfzjeJLw-unsplash.webp";

const SignUpPage = () => {
  const data = {
    heading: "Sign up",
    paragraph: "Already have an account?",
    paragraphLinkText: "Sign in",
    paragraphLinkHref: "/auth/login",
    inputs: [
      { type: "text", placeholder: "Your name" },
      { type: "text", placeholder: "Username" },
      { type: "email", placeholder: "Email address" },
      { type: "password", placeholder: "Password" },
    ] as { type: Types; placeholder: string }[],
    confirmationText: ["I agree with", "Privacy Policy", "and", "Terms of Use"],
    btnText: "Signup",
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="basis-1/2">
        <Image
          src={img}
          alt="Model presenting latest fashion"
          className="pointer-events-none h-auto object-cover"
        />
      </div>
      <div className="basis-1/2 flex flex-col justify-center gap-8 max-w-[456px] mx-auto">
        <h2 className="heading-2">{data.heading}</h2>
        <p className="text">
          {data.paragraph}&nbsp;
          <Link
            href={data.paragraphLinkHref}
            className="text font-semibold hover:opacity-70 transition"
          >
            {data.paragraphLinkText}
          </Link>
        </p>
        <div className="flex flex-col gap-8">
          {data.inputs.map((data) => (
            <Input
              key={data.placeholder}
              type={data.type}
              placeholder={data.placeholder}
            />
          ))}
        </div>
        <div className="flex items-center">
          <Input
            type="checkbox"
            id="terms"
            label="terms of service"
            className="mr-3"
          />
          <p className="text">
            {data.confirmationText.map((txt, i) =>
              i % 2 ? (
                <Link
                  key={txt}
                  href="#"
                  className="text font-semibold hover:opacity-70 transition"
                >
                  &nbsp;
                  {txt}&nbsp;
                </Link>
              ) : (
                txt
              )
            )}
          </p>
        </div>
        <Button className="rounded-md">{data.btnText}</Button>
      </div>
    </div>
  );
};

export default SignUpPage;
