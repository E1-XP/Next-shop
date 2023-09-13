import * as React from "react";

import Button from "@/app/components/Button";
import Input, { Types } from "@/app/components/Input";
import Link from "next/link";
import Image from "next/image";

import img from "@/../public/images/chris-ghinda-NYQyBIUCs_A-unsplash.webp";

const SignUpPage = () => {
  const data = {
    heading: "Sign up",
    paragraph: "Already have an account?",
    paragraphLinkText: "Sign in",
    paragraphLinkHref: "/auth/login",
    inputs: [
      { type: "text", placeholder: "Your name", label: "Name" },
      { type: "text", placeholder: "Username", label: "User name" },
      { type: "email", placeholder: "Email address", label: "Email" },
      { type: "password", placeholder: "Password", label: "Password" },
    ] as { type: Types; placeholder: string; label: string }[],
    confirmationText: ["I agree with", "Privacy Policy", "and", "Terms of Use"],
    btnText: "Signup",
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh_-_72px_-_104px)] justify-center">
      <div className="hidden lg:block lg:basis-1/2 overflow-hidden">
        <Image
          src={img}
          alt="Model presenting latest fashion"
          className="pointer-events-none object-cover object-[50%_75%] h-full w-full"
        />
      </div>
      <div className="lg:basis-1/2 flex flex-col justify-center gap-8 wrapper max-w-[456px] my-8 mx-auto">
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
              id={data.label}
              label={data.label}
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
