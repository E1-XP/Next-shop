"use client";

import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Widget from "./Base";
import Button from "../Button";
import ProfileIcon from "../icons/Profile";

const UserWidget = () => {
  const session = useSession();
  const router = useRouter();

  const data = {
    loadingText: "Loading...",
    isAuthHeader: "Welcome back.",
    isUnAuthHeader: "Welcome to Next-shop.",
    isAuthParagraph: `Good to see you again, ${session.data?.user?.name}`,
    isUnAuthParagraph: "Please log in to get full access.",
    profileBtnText: "View Profile",
    isAuthActionBtnText: "Log out",
    isUnAuthActionBtnText: "Sign in",
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const isAuthenticated = session.status === "authenticated";
  const isLoading = session.status === "loading";

  const onButtonClick = () => {
    if (isAuthenticated) signOut();
    else router.push("/signin");

    toggleIsOpen();
  };

  return (
    <Widget
      referenceContent={() => (
        <ProfileIcon
          className={`stroke-darkGray group-hover:opacity-60 transition ${
            isAuthenticated ? "h-[18px] w-[18px]" : ""
          }`}
        />
      )}
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
              <Button className="whitespace-nowrap rounded-md w-full">
                {data.profileBtnText}
              </Button>
            )}
            <Button
              className="whitespace-nowrap rounded-md w-full"
              onClick={onButtonClick}
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
