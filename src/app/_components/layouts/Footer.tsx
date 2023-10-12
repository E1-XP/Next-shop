import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import LanguageDropdown from "../dropdowns/LanguageDropdown";
import CurrencyDropdown from "../dropdowns/CurrencyDropdown";

import FacebookIcon from "../icons/Facebook";
import InstagramIcon from "../icons/Instagram";
import TwitterIcon from "../icons/Twitter";
import EmailIcon from "../icons/Email";

import USAFlag from "@/../public/images/USAFlag.svg";
import PolishFlag from "@/../public/images/PolishFlag.svg";

const Footer = () => {
  const t = useTranslations("Footer");

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
        {
          text: "English",
          flagImg: USAFlag,
          flagAltText: t("dropdowns.language.0.flagAltText"),
          locale: "en",
        },
        {
          text: "Polski",
          flagImg: PolishFlag,
          flagAltText: t("dropdowns.language.0.flagAltText"),
          locale: "pl",
        },
      ],
      currency: [{ text: "USD" }, { text: "PLN" }],
    },
  };

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
          <LanguageDropdown options={data.dropdowns.language} />
          <CurrencyDropdown options={data.dropdowns.currency} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
