"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import Button from "@/app/_components/Button";
import Input, { Types } from "@/app/_components/Input";

import img from "@/../public/images/chris-ghinda-n4L__DFy43s-unsplash.webp";
import GithubIcon from "@/app/_components/icons/Github";

import { SchemaKeys, SchemaType, signInSchema } from "./validation";
import { setZodErrorMap } from "@/app/_lib/zod";

const SignInPage = () => {
  const t = useTranslations("SignIn");
  const locale = useLocale();
  const router = useRouter();

  setZodErrorMap(locale);

  const [isRedirecting, setIsRedirecting] = React.useState(false);

  const data = {
    heading: t("heading"),
    paragraph: t("paragraph"),
    paragraphLinkText: t("paragraphLinkText"),
    paragraphLinkHref: "/signup",
    orText: t("orText"),
    githubBtnText: t("githubBtnText"),
    inputs: [
      {
        type: "email",
        placeholder: t("inputs.0.placeholder"),
        label: t("inputs.0.label"),
        id: "email",
      },
      {
        type: "password",
        placeholder: t("inputs.1.placeholder"),
        label: t("inputs.1.label"),
        id: "password",
      },
    ] as { type: Types; placeholder: string; label: string; id: SchemaKeys }[],
    resetPasswordText: t("resetPasswordText"),
    btnText: t("btnText"),
    toast: {
      unknownCredentials: t("toast.unknownCredentials"),
      loginSuccess: t("toast.loginSuccess"),
      credentialsTipText: t("toast.credentialsTipText"),
      credentialsData: "admin@admin.com, Admin123!",
    },
    imgAltText: t("imgAltText"),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaType>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SchemaType> = async (formData) => {
    const response = await signIn("credentials", {
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      redirect: false,
    });

    if (response?.error) {
      toast.error(data.toast.unknownCredentials);
    } else {
      setIsRedirecting(true);

      router.push("/");
      requestAnimationFrame(() => toast.success(data.toast.loginSuccess));
    }
  };

  const credentialsToastId = React.useRef<number | string | null>(null);

  React.useEffect(() => {
    credentialsToastId.current = toast.info(
      `${data.toast.credentialsTipText} ${data.toast.credentialsData}`,
      { autoClose: false }
    );

    return () => {
      credentialsToastId.current && toast.dismiss(credentialsToastId.current);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh_-_72px_-_104px)] justify-center">
      <div className="hidden lg:block lg:basis-1/2 overflow-hidden">
        <Image
          src={img}
          alt={data.imgAltText}
          placeholder="blur"
          className="pointer-events-none object-cover object-[50%_75%] h-full w-full"
        />
      </div>
      <form
        className="lg:basis-1/2 flex flex-col justify-center gap-8 wrapper w-full max-w-[456px] my-8 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
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
        <Button
          className="flex items-center justify-center gap-2 rounded-md"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <GithubIcon />
          {data.githubBtnText}
        </Button>
        <div className="flex items-center justify-between gap-3 paragraph">
          <span className="border-dashed border-b border-whiteGray3 block grow mt-1"></span>
          {data.orText}
          <span className="border-dashed border-b border-whiteGray3 block grow mt-1"></span>
        </div>
        <div className="flex flex-col gap-8">
          {data.inputs.map((data, i) => (
            <div key={data.placeholder} className="relative">
              <Input
                type={data.type}
                placeholder={data.placeholder}
                id={data.id}
                label={data.label}
                register={register}
                className={twMerge(
                  `w-full`,
                  errors[data.id]?.message
                    ? "border-red-500 outline-red-500"
                    : ""
                )}
              />
              <p className="text-red-500 font-body text-sm absolute -bottom-[26px] left-0">
                {errors[data.id]?.message}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <Link
            href="#"
            className="paragraph font-semibold hover:opacity-70 transition ml-1"
          >
            {data.resetPasswordText}
          </Link>
        </div>
        <Button
          className="rounded-md"
          type="submit"
          disabled={isSubmitting || isRedirecting}
          isLoading={isSubmitting || isRedirecting}
        >
          {data.btnText}
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
