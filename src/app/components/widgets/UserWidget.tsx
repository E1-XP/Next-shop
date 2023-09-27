"use client";

import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import { usePopper } from "react-popper";

import ProfileIcon from "../icons/Profile";
import Button from "../Button";
import { useRouter } from "next/navigation";

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

  const [referenceElement, setReferenceElement] = React.useState<any>(null);
  const [popperElement, setPopperElement] = React.useState<any>(null);

  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "bottom",
      modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
    }
  );

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
    update && update();
  };

  const isAuthenticated = session.status === "authenticated";
  const isLoading = session.status === "loading";

  const onButtonClick = () => {
    if (isAuthenticated) signOut();
    else router.push("/signin");

    toggleIsOpen();
  };

  React.useEffect(() => {
    // to fix popper placement on initial load
    const triggerResize = () => window.dispatchEvent(new Event("resize"));
    setTimeout(triggerResize, 1000);
  }, []);

  return (
    <>
      <div className="relative z-50" ref={setReferenceElement}>
        <span
          onClick={toggleIsOpen}
          className={
            isAuthenticated ? "bg-whiteGray3 rounded-full p-1 block" : ""
          }
        >
          <ProfileIcon
            className={`stroke-darkGray group-hover:opacity-60 transition ${
              isAuthenticated ? "h-[18px] w-[18px]" : ""
            }`}
          />
        </span>
        <div
          className={`absolute top-full bg-white p-4 rounded-md border border-grayWhite gap-6 flex-col items-center flex w-80 min-h-[280px] transition-all transform ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 pointer-events-none"
          }`}
          ref={setPopperElement}
          style={{
            ...styles.popper,
            top: isOpen ? "0px" : "-20px",
          }}
          {...attributes.popper}
        >
          {isLoading ? (
            <div className="self-center mt-auto mb-auto">
              {data.loadingText}
            </div>
          ) : (
            <>
              <div className="bg-whiteGray3 rounded-full p-4">
                <ProfileIcon className="h-10 w-10 stroke-darkGray" />
              </div>
              <p className="heading-5">
                {isAuthenticated ? data.isAuthHeader : data.isUnAuthHeader}
              </p>
              <p className="text whitespace-nowrap truncate">
                {isAuthenticated
                  ? data.isAuthParagraph
                  : data.isUnAuthParagraph}
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
        </div>
      </div>
      <div
        className={`opacity-0 pointer-events-none absolute top-0 left-0 w-full h-screen z-40 ${
          isOpen ? "pointer-events-auto" : ""
        }`}
        onClick={toggleIsOpen}
      ></div>
    </>
  );
};

export default UserWidget;
