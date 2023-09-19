"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";

import Button from "@/app/components/Button";
import Input, { Types } from "@/app/components/Input";

import img from "@/../public/images/chris-ghinda-NYQyBIUCs_A-unsplash.webp";

const SignUpPage = () => {
  const data = {
    heading: "Sign up",
    paragraph: "Already have an account?",
    paragraphLinkText: "Sign in",
    paragraphLinkHref: "/signin",
    inputs: [
      { type: "text", placeholder: "Your name", label: "Name" },
      { type: "text", placeholder: "Username", label: "User name" },
      { type: "email", placeholder: "Email address", label: "Email" },
      { type: "password", placeholder: "Password", label: "Password" },
      {
        type: "password",
        placeholder: "Confirm password",
        label: "Confirm password",
      },
    ] as { type: Types; placeholder: string; label: string }[],
    confirmationInput: { type: "checkbox" as Types, label: "Terms of service" },
    confirmationText: ["I agree with", "Privacy Policy", "and", "Terms of Use"],
    btnText: "Signup",
  };

  const [nameValue, setNameValue] = React.useState("");
  const [nameMessage, setNameMessage] = React.useState("");

  const [userNameValue, setUserNameValue] = React.useState("");
  const [userNameMessage, setUserNameMessage] = React.useState("");

  const [emailValue, setEmailValue] = React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");

  const [passwordValue, setPasswordValue] = React.useState("");
  const [passwordMessage, setPasswordMessage] = React.useState("");

  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] =
    React.useState("");

  const [termsConfirmationValue, setTermsConfirmationValue] =
    React.useState(false);
  const [termsConfirmationMessage, setTermsConfirmationMessage] =
    React.useState("");

  const inputSetters = [
    [setNameValue, setNameMessage],
    [setUserNameValue, setUserNameMessage],
    [setEmailValue, setEmailMessage],
    [setPasswordValue, setPasswordMessage],
    [setConfirmPasswordValue, setConfirmPasswordMessage],
  ];

  const inputGetters = [
    [nameValue, nameMessage],
    [userNameValue, userNameMessage],
    [emailValue, emailMessage],
    [passwordValue, passwordMessage],
    [confirmPasswordValue, confirmPasswordMessage],
  ];

  const signUpSchema = z
    .object({
      name: z
        .string()
        .min(2)
        .max(24)
        .regex(
          new RegExp(/^[a-zA-Z\s]*\s+[a-zA-Z\s]*$/),
          "Write your name and surname divided by space"
        )
        .trim(),
      userName: z
        .string()
        .min(2)
        .max(24)
        .regex(
          new RegExp(/^[a-zA-Z0-9-_]+$/),
          "Alphanumeric, underscores or dash characters only"
        )
        .trim(),
      email: z.string().email().nonempty().trim(),
      password: z
        .string()
        .min(8)
        .max(32)
        .regex(
          new RegExp(
            /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]).*(?=.*[a-zA-Z]).*(?=.*\d).+$/
          ),
          "Please combine numbers, letters and special characters"
        )
        .trim(),
      confirmPassword: z.string().min(8).trim(),
      termsConfirmation: z.literal(true),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }
    });

  const onSubmit = () => {
    const inputsData = {
      name: nameValue,
      userName: userNameValue,
      email: emailValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
      termsConfirmation: termsConfirmationValue,
    };

    const result = signUpSchema.safeParse(inputsData);

    if (!result.success) {
      const errorMessages = result.error.format();

      setNameMessage(errorMessages.name?._errors[0] || "");
      setUserNameMessage(errorMessages.userName?._errors[0] || "");
      setEmailMessage(errorMessages.email?._errors[0] || "");
      setPasswordMessage(errorMessages.password?._errors[0] || "");
      setConfirmPasswordMessage(
        errorMessages.confirmPassword?._errors[0] || ""
      );
      setTermsConfirmationMessage(
        errorMessages.termsConfirmation?._errors[0] || ""
      );
    } else {
      console.log("ok");
    }
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
        onSubmit={(e) => (e.preventDefault(), onSubmit())}
        noValidate={true}
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
        <div className="flex flex-col gap-8">
          {data.inputs.map((data, i) => (
            <div key={data.placeholder} className="relative">
              <Input
                type={data.type}
                placeholder={data.placeholder}
                id={data.label}
                label={data.label}
                onChange={(e) => (
                  inputSetters[i][0](e.target.value), inputSetters[i][1]("")
                )}
                className={`w-full ${
                  inputGetters[i][1].length && "border-red-500 outline-red-500"
                }`}
              />
              <p className="text-red-500 font-body text-sm absolute -bottom-[26px] left-0">
                {inputGetters[i][1]}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <Input
            type={data.confirmationInput.type}
            id={data.confirmationInput.label}
            label={data.confirmationInput.label}
            className={`mr-3 ${
              termsConfirmationMessage.length &&
              "ring-red-500 ring-1 ring-inset"
            }`}
            checked={termsConfirmationValue}
            onChange={(e) => (
              setTermsConfirmationValue(!termsConfirmationValue),
              !termsConfirmationValue && setTermsConfirmationMessage("")
            )}
          />
          <p
            className={`text ${
              termsConfirmationMessage.length && "text-red-500"
            }`}
          >
            {data.confirmationText.map((txt, i) =>
              i % 2 ? (
                <Link
                  key={txt}
                  href="#"
                  className="text font-semibold hover:opacity-70 transition text-inherit"
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
      </form>
    </div>
  );
};

export default SignUpPage;
