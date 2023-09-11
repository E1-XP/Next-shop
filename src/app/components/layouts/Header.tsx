"use client";

import Link from "next/link";
import * as React from "react";
import debounce from "lodash.debounce";

import Hamburger from "../Hamburger";

import SearchIcon from "../icons/Search";
import ProfileIcon from "../icons/Profile";
import ShoppingBagIcon from "../icons/ShoppingBag";

import FacebookIcon from "../icons/Facebook";
import InstagramIcon from "../icons/Instagram";
import TwitterIcon from "../icons/Twitter";
import EmailIcon from "../icons/Email";

const Header = () => {
  const cartItemsCount = 2;

  const data = {
    logoText: "Next-Shop",
    mainMenuItems: [
      { text: "New Arrivals", url: "#" },
      {
        text: "Men",
        url: "#",
      },
      {
        text: "Women",
        url: "#",
      },
      {
        text: "Kids",
        url: "#",
      },
    ],
    actionsMenuItems: [
      { name: "Search", icon: SearchIcon },
      { name: "Profile", icon: ProfileIcon },
      { name: "Cart", icon: ShoppingBagIcon },
    ],
    socials: [
      { name: "Facebook", icon: FacebookIcon, url: "#" },
      { name: "Instagram", icon: InstagramIcon, url: "#" },
      { name: "Twitter", icon: TwitterIcon, url: "#" },
      { name: "Email", icon: EmailIcon, url: "#" },
    ],
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);

  const onScroll = debounce(() => {
    const scrollPos = window.scrollY;

    const isNavVisible =
      isMenuOpen || prevScrollPos > scrollPos || scrollPos < 72;

    setIsVisible(isNavVisible);
    setPrevScrollPos(scrollPos);
  });

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isVisible, prevScrollPos]);

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
          className={`z-40 bg-white max-sm:transition-opacity flex max-sm:gap-16 max-sm:pt-16 sm:justify-between w-full max-sm:flex-col max-sm:absolute max-sm:top-[72px] max-sm:left-0 max-sm:h-[calc(100vh_-_72px)] ${
            isMenuOpen ? "" : "max-sm:opacity-0 max-sm:pointer-events-none"
          }`}
        >
          <ul className="flex gap-4 mx-auto w-fit">
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
          {isMenuOpen && (
            <div className="bg-whiteGray h-full flex justify-center pt-4">
              <ul className="flex md:hidden gap-4 self-start">
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
        <nav className="flex gap-2">
          <ul className="flex gap-3.5 md:gap-4 max-sm:justify-center w-fit max-sm:mx-auto">
            {data.actionsMenuItems.map((item, i, arr) => (
              <li
                key={item.name}
                className="flex items-center cursor-pointer group"
              >
                <span className="sr-only group-hover:opacity-60 transition">
                  {item.name}
                </span>
                <item.icon className="stroke-darkGray group-hover:opacity-60 transition" />
                {i === arr.length - 1 && cartItemsCount && (
                  <span className="bg-darkGray text-white text-xs font-body font-medium px-[9px] py-0.5 rounded-full ml-2 group-hover:opacity-70 transition">
                    {cartItemsCount}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <Hamburger
            className="sm:hidden"
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
