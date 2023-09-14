"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

import Button from "@/app/components/Button";
import Input, { Types } from "@/app/components/Input";

import img from "@/../public/images/chris-ghinda-n4L__DFy43s-unsplash.webp";
import GithubIcon from "@/app/components/icons/Github";

const SignUpPage = () => {
  const data = {
    heading: "Sign in",
    paragraph: "Don’t have an accout yet? ",
    paragraphLinkText: "Sign up",
    paragraphLinkHref: "/signup",
    githubBtnText: "Sign in with Github",
    inputs: [
      { type: "email", placeholder: "Email address", label: "Email" },
      { type: "password", placeholder: "Password", label: "Password" },
    ] as { type: Types; placeholder: string; label: string }[],
    rememberMeInput: {
      type: "checkbox" as Types,
      label: "Remember me",
    },
    rememberMeText: "Remember me",
    resetPasswordText: "Forgot password?",
    btnText: "Sign in",
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
      <form
        className="lg:basis-1/2 flex flex-col justify-center gap-8 wrapper w-full max-w-[456px] my-8 mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
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
        <Button
          className="flex items-center justify-center gap-2 rounded-md"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <GithubIcon />
          {data.githubBtnText}
        </Button>
        <div className="flex items-center justify-between gap-3 text">
          <span className="border-dashed border-b border-whiteGray3 block grow mt-1"></span>
          or
          <span className="border-dashed border-b border-whiteGray3 block grow mt-1"></span>
        </div>
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
        <div className="flex justify-between items-center flex-wrap">
          <Input
            type={data.rememberMeInput.type}
            id={data.rememberMeInput.label}
            label={data.rememberMeInput.label}
            className="mr-3"
          />
          <p className="text mr-auto">{data.rememberMeText}</p>
          <Link
            href="#"
            className="text font-semibold hover:opacity-70 transition ml-1"
          >
            {data.resetPasswordText}
          </Link>
        </div>
        <Button className="rounded-md">{data.btnText}</Button>
      </form>
    </div>
  );
};

export default SignUpPage;
