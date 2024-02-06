"use client";

import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";
import debounce from "lodash.debounce";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import Hamburger from "../Hamburger";
import UserWidget from "../widgets/UserWidget";
import CartWidget from "../widgets/CartWidget";
import SearchMenuSwitcher from "../SearchMenuSwitcher";
import SearchBox from "../SearchBox";

import FacebookIcon from "../icons/Facebook";
import InstagramIcon from "../icons/Instagram";
import TwitterIcon from "../icons/Twitter";
import EmailIcon from "../icons/Email";

import { Link } from "@/navigation";
import { useWindowSize } from "@/app/_hooks/useWindowSize";
import { breakPoints } from "@/app/_styles/constants";

const Header = () => {
  const t = useTranslations("Header");
  const pathName = usePathname();
  const params = useSearchParams();
  const query = params.get("query") || "";

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = React.useState(false);
  const [isSuggestionListOpen, setIsSuggestionListOpen] = React.useState(false);

  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);

  const { width } = useWindowSize();

  const data = {
    logoText: "Next-shop",
    mainMenuItems: [
      { text: t("mainMenuItems.0.text"), url: "#" },
      {
        text: t("mainMenuItems.1.text"),
        url: "#",
      },
      {
        text: t("mainMenuItems.2.text"),
        url: "#",
      },
      {
        text: t("mainMenuItems.3.text"),
        url: "#",
      },
    ],
    actionsMenuItems: [
      { name: t("actionsMenuItems.0.name") },
      { name: t("actionsMenuItems.1.name") },
      { name: t("actionsMenuItems.2.name") },
    ],
    socials: [
      { name: "Facebook", icon: FacebookIcon, url: "#" },
      { name: "Instagram", icon: InstagramIcon, url: "#" },
      { name: "Twitter", icon: TwitterIcon, url: "#" },
      { name: "Email", icon: EmailIcon, url: "#" },
    ],
  };

  const onScroll = debounce(() => {
    const scrollPos = window.scrollY;

    const isNavVisible =
      isMenuOpen || prevScrollPos > scrollPos || scrollPos < 72;

    setIsVisible(isNavVisible);
    setPrevScrollPos(scrollPos);
  });

  const setIsSearchBoxOpenWrapper = (isOpen: boolean) => {
    const isMobile = width < breakPoints.SM;
    if (isMobile) setIsMenuOpen(true);

    setIsSearchBoxOpen(isOpen);
  };

  const setIsMenuOpenWrapper = (isOpen: boolean) => {
    const isMobile = width < breakPoints.SM;
    if (isMobile && isSearchBoxOpen) setIsSearchBoxOpen(false);

    setIsMenuOpen(isOpen);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [isVisible, prevScrollPos]);

  React.useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchBoxOpen(false);
  }, [pathName, query]);

  return (
    <header
      className="h-[72px] flex items-center bg-white z-40 sticky w-full top-0 transition-transform"
      style={{ transform: isVisible ? "translateY(0)" : "translateY(-72px)" }}
    >
      <div className="wrapper w-full flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-display font-semibold -tracking-[0.7px] whitespace-nowrap text-darkGray">
            {data.logoText}
          </h1>
        </Link>
        <nav
          className={twMerge(
            "z-40 bg-white max-sm:transition-opacity flex max-sm:gap-16 max-sm:pt-8 sm:justify-between w-full max-sm:flex-col max-sm:absolute max-sm:top-[72px] max-sm:left-0 max-sm:h-[calc(100vh_-_72px)] sm:h-[72px]",
            isMenuOpen ? "" : "max-sm:opacity-0 max-sm:pointer-events-none",
            isSearchBoxOpen ? "" : "sm:overflow-hidden",
            isSuggestionListOpen ? "" : "overflow-hidden"
          )}
        >
          <div
            className={twMerge(
              "flex flex-col h-max mx-auto w-fit gap-6 sm:py-6 transition max-sm:w-[90%]",
              isSearchBoxOpen ? "sm:-translate-y-[62px]" : ""
            )}
          >
            <ul
              className={twMerge(
                "flex gap-4 justify-center",
                isSearchBoxOpen ? "max-sm:hidden" : ""
              )}
            >
              {data.mainMenuItems.map((item) => (
                <li
                  key={item.text}
                  className="link flex items-center opacity-70 hover:opacity-100 transition"
                >
                  <Link href={item.url} className="">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
            <SearchBox
              className={isSearchBoxOpen ? "" : "hidden"}
              suggestionListStateControl={[
                isSuggestionListOpen,
                setIsSuggestionListOpen,
              ]}
              isMenuOpenStateControl={[isMenuOpen, setIsMenuOpen]}
            />
          </div>
          {isMenuOpen && (
            <div className="bg-whiteGray h-full flex justify-center pt-4">
              <ul className="flex sm:hidden gap-4 self-start">
                {data.socials.map((item) => (
                  <li key={item.name} className="hover:opacity-70 transition">
                    <Link href={item.url}>
                      <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <item.icon className="stroke-darkGray" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
        <nav className="flex min-[360px]:gap-2 items-center">
          <ul className="flex gap-0.5 min-[360px]:gap-2 md:gap-4 max-sm:justify-center w-fit max-sm:mx-auto">
            {data.actionsMenuItems.map((item, i) => (
              <li key={item.name} className="flex items-center">
                <span className="sr-only">{item.name}</span>
                {i === 0 && (
                  <SearchMenuSwitcher
                    isSearchBoxOpen={isSearchBoxOpen}
                    setIsSearchBoxOpen={setIsSearchBoxOpenWrapper}
                  />
                )}
                {i === 1 && <UserWidget />}
                {i === 2 && <CartWidget />}
              </li>
            ))}
          </ul>
          <Hamburger
            className="sm:hidden"
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpenWrapper}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
