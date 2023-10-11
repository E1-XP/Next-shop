"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Button from "@/app/_components/Button";
import Input, { Types } from "@/app/_components/Input";

import img from "@/../public/images/chris-ghinda-NYQyBIUCs_A-unsplash.webp";

import { SchemaKeys, SchemaType, signUpSchema } from "./validation";
import { trpc } from "@/app/_trpc/client";

const SignUpPage = () => {
  const data = {
    heading: "Sign up",
    paragraph: "Already have an account?",
    paragraphLinkText: "Sign in",
    paragraphLinkHref: "/signin",
    inputs: [
      { type: "text", placeholder: "Your name", label: "Name", id: "name" },
      {
        type: "text",
        placeholder: "Username",
        label: "Username",
        id: "username",
      },
      {
        type: "email",
        placeholder: "Email address",
        label: "Email",
        id: "email",
      },
      {
        type: "password",
        placeholder: "Password",
        label: "Password",
        id: "password",
      },
      {
        type: "password",
        placeholder: "Confirm password",
        label: "Confirm password",
        id: "confirmPassword",
      },
    ] as { type: Types; placeholder: string; label: string; id: SchemaKeys }[],
    confirmationInput: {
      type: "checkbox" as Types,
      label: "Terms of service",
      id: "termsConfirmation",
    },
    confirmationText: ["I agree with", "Privacy Policy", "and", "Terms of Use"],
    btnText: "Sign up",
  };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SchemaType>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: createUser } = trpc.signup.useMutation({
    async onSuccess(data) {
      const response = await signIn("credentials", {
        email: data.email,
        password: getValues().password,
        redirect: true,
        callbackUrl: "/",
      });
    },
    onError(resp) {
      if (resp.message.toLowerCase().includes("mail")) {
        setError("email", { type: "custom", message: resp.message });
      } else if (resp.message.toLowerCase().includes("user")) {
        setError("username", { type: "custom", message: resp.message });
      }
    },
  });

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
        onSubmit={handleSubmit((data) => createUser(data))}
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
                id={data.id}
                label={data.label}
                register={register}
                className={`w-full ${
                  errors[data.id]?.message && "border-red-500 outline-red-500"
                }`}
              />
              <p className="text-red-500 font-body text-sm absolute -bottom-[26px] left-0">
                {errors[data.id]?.message}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <Input
            type={data.confirmationInput.type}
            id={data.confirmationInput.id}
            label={data.confirmationInput.label}
            className={`mr-3 ${
              errors.termsConfirmation?.message &&
              "ring-red-500 ring-1 ring-inset"
            }`}
            register={register}
          />
          <p
            className={`text ${
              errors.termsConfirmation?.message && "text-red-500"
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
        <Button type="submit" className="rounded-md" disabled={isSubmitting}>
          {data.btnText}
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;