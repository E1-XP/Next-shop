"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import Button from "@/app/_components/Button";
import Input, { Types } from "@/app/_components/Input";

import img from "@/../public/images/chris-ghinda-NYQyBIUCs_A-unsplash.webp";

import { SchemaKeys, SchemaType, signUpSchema } from "./validation";
import { trpc } from "@/app/_trpc/client";
import { setZodErrorMap } from "@/app/_lib/zod";

const SignUpPage = () => {
  const t = useTranslations("SignUp");
  const locale = useLocale();

  setZodErrorMap(locale);

  const data = {
    heading: t("heading"),
    paragraph: t("paragraph"),
    paragraphLinkText: t("paragraphLinkText"),
    paragraphLinkHref: "/signin",
    inputs: [
      {
        type: "text",
        placeholder: t("inputs.0.placeholder"),
        label: t("inputs.0.label"),
        id: "name",
      },
      {
        type: "text",
        placeholder: t("inputs.1.placeholder"),
        label: t("inputs.1.label"),
        id: "username",
      },
      {
        type: "email",
        placeholder: t("inputs.2.placeholder"),
        label: t("inputs.2.label"),
        id: "email",
      },
      {
        type: "password",
        placeholder: t("inputs.3.placeholder"),
        label: t("inputs.3.label"),
        id: "password",
      },
      {
        type: "password",
        placeholder: t("inputs.4.placeholder"),
        label: t("inputs.4.label"),
        id: "confirmPassword",
      },
    ] as { type: Types; placeholder: string; label: string; id: SchemaKeys }[],
    confirmationInput: {
      type: "checkbox" as Types,
      label: t("confirmationInput.label"),
      id: "termsConfirmation",
    },
    confirmationText: [
      t("confirmationText.0"),
      t("confirmationText.1"),
      t("confirmationText.2"),
      t("confirmationText.3"),
    ],
    btnText: t("btnText"),
  };

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

  const { mutate: createUser } = trpc.auth.signup.useMutation({
    async onSuccess(data) {
      await signIn("credentials", {
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
        <p className="paragraph">
          {data.paragraph}&nbsp;
          <Link
            href={data.paragraphLinkHref}
            className="paragraph font-semibold hover:opacity-70 transition"
          >
            {data.paragraphLinkText}
          </Link>
        </p>
        <div className="flex flex-col gap-8">
          {data.inputs.map((data, i) => {
            const message = errors[data.id]?.message;
            const isLocalePath = message?.startsWith("i18n:");

            return (
              <div key={data.placeholder} className="relative">
                <Input
                  type={data.type}
                  placeholder={data.placeholder}
                  id={data.id}
                  label={data.label}
                  register={register}
                  className={twMerge(
                    "w-full",
                    message ? "border-red-500 outline-red-500" : ""
                  )}
                />
                <p className="text-red-500 font-body text-sm absolute -bottom-[26px] left-0">
                  {isLocalePath ? t(message?.split("i18n:")[1]) : message}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center">
          <Input
            type={data.confirmationInput.type}
            id={data.confirmationInput.id}
            label={data.confirmationInput.label}
            className={twMerge(
              "mr-3",
              errors.termsConfirmation?.message
                ? "ring-red-500 ring-1 ring-inset"
                : ""
            )}
            register={register}
          />
          <p
            className={twMerge(
              "paragraph",
              errors.termsConfirmation?.message ? "text-red-500" : ""
            )}
          >
            {data.confirmationText.map((txt, i) =>
              i % 2 ? (
                <Link
                  key={txt}
                  href="#"
                  className="paragraph font-semibold hover:opacity-70 transition text-inherit"
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
        <Button
          type="submit"
          className="rounded-md"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {data.btnText}
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
