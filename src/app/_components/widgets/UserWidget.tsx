"use client";

import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import Image from "next/image";

import { useRouter } from "@/navigation";

import Widget from "./Base";
import Button from "../Button";
import ProfileIcon from "../icons/Profile";

const UserWidget = () => {
  const session = useSession();
  const router = useRouter();
  const t = useTranslations("widgets.UserWidget");

  const data = {
    loadingText: t("loadingText"),
    isAuthHeader: t("isAuthHeader"),
    isUnAuthHeader: t("isUnAuthHeader"),
    isAuthParagraph: `${t("isAuthParagraph")}, ${session.data?.user?.name}`,
    isUnAuthParagraph: t("isUnAuthParagraph"),
    profileBtnText: t("profileBtnText"),
    isAuthActionBtnText: t("isAuthActionBtnText"),
    isUnAuthActionBtnText: t("isUnAuthActionBtnText"),
    toast: {
      logOut: t("toast.logOut"),
    },
  };

  const isAuthenticated = session.status === "authenticated";
  const isLoading = session.status === "loading";
  const hasUserAvatar = !!session.data?.user.image;

  const onAuthActionButtonClick = () => {
    if (isAuthenticated) {
      signOut();
      setTimeout(() => toast.success(data.toast.logOut), 200);
    } else router.push("/signin");
  };

  const onProfileButtonClick = () => {
    toast.info("This feature is not yet implemented.");
  };

  return (
    <Widget
      buttonLabelText="Open user widget"
      referenceContent={(isOpen) =>
        isLoading ? (
          <Skeleton className="w-[26px] h-[26px]" borderRadius={999} />
        ) : (
          <span
            className={twMerge(
              "transition",
              isOpen ? "opacity-60" : "hover:opacity-60"
            )}
          >
            {hasUserAvatar ? (
              <Image
                src={session.data?.user.image}
                alt="User avatar"
                width={26}
                height={26}
              />
            ) : (
              <ProfileIcon
                className={twMerge(
                  "stroke-darkGray group-hover:opacity-60 transition",
                  isAuthenticated ? "h-[18px] w-[18px]" : ""
                )}
              />
            )}
          </span>
        )
      }
      referenceContentClass={twMerge(
        isAuthenticated
          ? "bg-whiteGray3 rounded-full block overflow-hidden"
          : "",
        !hasUserAvatar ? "p-1" : " border border-darkGray"
      )}
    >
      {isLoading ? (
        <div className="self-center mt-auto mb-auto">{data.loadingText}</div>
      ) : (
        <>
          {hasUserAvatar ? (
            <div className="rounded-full overflow-hidden border border-darkGray">
              <Image
                src={session.data?.user.image}
                alt="User avatar"
                width={72}
                height={72}
              />
            </div>
          ) : (
            <div
              className={twMerge(
                "bg-whiteGray3 rounded-full p-4",
                hasUserAvatar ? "border border-darkGray" : ""
              )}
            >
              <ProfileIcon className="h-10 w-10 stroke-darkGray" />
            </div>
          )}
          <p className="heading-5">
            {isAuthenticated ? data.isAuthHeader : data.isUnAuthHeader}
          </p>
          <p className="paragraph whitespace-nowrap truncate">
            {isAuthenticated ? data.isAuthParagraph : data.isUnAuthParagraph}
          </p>
          <div className="flex flex-col gap-2 w-full">
            {isAuthenticated && (
              <Button
                className="whitespace-nowrap rounded-md w-full"
                onClick={onProfileButtonClick}
              >
                {data.profileBtnText}
              </Button>
            )}
            <Button
              className="whitespace-nowrap rounded-md w-full"
              onClick={onAuthActionButtonClick}
            >
              {isAuthenticated
                ? data.isAuthActionBtnText
                : data.isUnAuthActionBtnText}
            </Button>
          </div>
        </>
      )}
    </Widget>
  );
};

export default UserWidget;
