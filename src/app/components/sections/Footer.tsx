import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import Dropdown from "../Dropdown";

import FacebookIcon from "../icons/Facebook";
import InstagramIcon from "../icons/Instagram";
import TwitterIcon from "../icons/Twitter";
import EmailIcon from "../icons/Email";

import USAFlag from "./../../../../public/USAFlag.svg";
import PolishFlag from "./../../../../public/PolishFlag.svg";

const Footer = () => {
  const data = {
    socials: [
      { name: "Facebook", icon: FacebookIcon, url: "#" },
      { name: "Instagram", icon: InstagramIcon, url: "#" },
      { name: "Twitter", icon: TwitterIcon, url: "#" },
      { name: "Email", icon: EmailIcon, url: "#" },
    ],
    copyrightText: "© 2023 Next-shop",
    dropdowns: {
      language: [
        { text: "English", flagImg: USAFlag, flagAltText: "English flag" },
        { text: "Polski", flagImg: PolishFlag, flagAltText: "Polish flag" },
      ],
      currency: [{ text: "USD" }, { text: "PLN" }],
    },
  };

  type LanguageDropdown = typeof data.dropdowns.language;
  type Dropdowns = LanguageDropdown | typeof data.dropdowns.currency;

  const isLanguageDropdown = (
    dropdown: Dropdowns
  ): dropdown is LanguageDropdown => dropdown === data.dropdowns.language;

  return (
    <footer className="bg-whiteGray w-full">
      <div className="wrapper flex flex-col max-sm:gap-6 sm:flex-row justify-between items-center my-12 sm:my-8">
        <ul className="flex gap-4">
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
        <p className="paragraph-small sm:paragraph max-sm:order-1">
          {data.copyrightText}
        </p>
        <div className="flex gap-4 max-sm:-order-1">
          {Object.values(data.dropdowns).map((options, i) => (
            <Dropdown
              key={i}
              options={
                isLanguageDropdown(options)
                  ? options.map((option) => (
                      <>
                        {
                          <Image
                            src={option.flagImg}
                            alt={option.flagAltText}
                            className="w-3.5 mr-2"
                          />
                        }
                        {option.text}
                      </>
                    ))
                  : options.map((item) => item.text)
              }
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
