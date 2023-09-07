"use client";

import Link from "next/link";
import * as React from "react";

import Hamburger from "../Hamburger";
import SearchIcon from "../icons/Search";
import ProfileIcon from "../icons/Profile";
import ShoppingBagIcon from "../icons/ShoppingBag";

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
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="h-[72px] flex items-center bg-white z-40">
      <div className="wrapper w-full flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-display font-semibold -tracking-[0.7px] whitespace-nowrap text-darkGray">
            {data.logoText}
          </h1>
        </Link>
        <nav
          className={`z-40 bg-white max-sm:transition-opacity flex max-sm:gap-16 max-sm:pt-16 sm:justify-between w-full max-sm:flex-col max-sm:absolute max-sm:top-[72px] max-sm:left-0 max-sm:h-[calc(100%_-_72px)] ${
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
          <ul className="flex gap-8 sm:gap-4 max-sm:justify-center w-fit max-sm:mx-auto">
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
        </nav>
        <Hamburger
          className="sm:hidden"
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
        />
      </div>
    </header>
  );
};

export default Header;
