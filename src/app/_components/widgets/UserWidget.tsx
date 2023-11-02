"use client";

import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

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

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const isAuthenticated = session.status === "authenticated";
  const isLoading = session.status === "loading";

  const onAuthActionButtonClick = () => {
    if (isAuthenticated) {
      signOut();
      setTimeout(() => toast.info(data.toast.logOut), 200);
    } else router.push("/signin");

    toggleIsOpen();
  };

  const onProfileButtonClick = () => {
    toast.info("This feature is not yet implemented.");
  };

  return (
    <Widget
      referenceContent={() =>
        isLoading ? (
          <Skeleton className="w-[26px] h-[26px]" borderRadius={999} />
        ) : (
          <ProfileIcon
            className={twMerge(
              "stroke-darkGray group-hover:opacity-60 transition",
              isAuthenticated ? "h-[18px] w-[18px]" : ""
            )}
          />
        )
      }
      referenceContentClass={
        isAuthenticated ? "bg-whiteGray3 rounded-full p-1 block" : ""
      }
    >
      {isLoading ? (
        <div className="self-center mt-auto mb-auto">{data.loadingText}</div>
      ) : (
        <>
          <div className="bg-whiteGray3 rounded-full p-4">
            <ProfileIcon className="h-10 w-10 stroke-darkGray" />
          </div>
          <p className="heading-5">
            {isAuthenticated ? data.isAuthHeader : data.isUnAuthHeader}
          </p>
          <p className="text whitespace-nowrap truncate">
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
