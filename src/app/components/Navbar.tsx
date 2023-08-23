import Link from "next/link";
import * as React from "react";

import Hamburger from "./Hamburger";
import SearchIcon from "./icons/Search";
import ProfileIcon from "./icons/Profile";
import ShoppingBagIcon from "./icons/ShoppingBag";

const Navbar = () => {
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

  return (
    <nav className="h-[72px] border border-black flex items-center">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="text-xl font-display font-semibold -tracking-[0.7px]">
            {data.logoText}
          </h1>
        </Link>
        <ul className="flex gap-4">
          {data.mainMenuItems.map((item) => (
            <li
              key={item.text}
              className="flex items-center opacity-70 hover:opacity-100 transition"
            >
              <Link href={item.url} className="">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-4">
          {data.actionsMenuItems.map((item, i, arr) => (
            <li
              key={item.name}
              className="flex items-center cursor-pointer group"
            >
              <item.icon className="stroke-darkGray group-hover:opacity-60 transition" />
              {i === arr.length - 1 && (
                <span className="bg-darkGray text-white text-xs font-body font-medium px-[9px] py-0.5 rounded-full ml-2 group-hover:opacity-70 transition">
                  {cartItemsCount}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
