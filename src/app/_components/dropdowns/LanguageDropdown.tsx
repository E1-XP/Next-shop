"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next-intl/client";
import { useLocale } from "next-intl";

import Dropdown from "./Base";

interface Option {
  text: string;
  flagImg: any;
  flagAltText: string;
  locale: string;
}

interface Props {
  options: Option[];
}

const LanguageDropdown = ({ options }: Props) => {
  const [isPending, startTransition] = React.useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const defaultIdx = options.findIndex((o) => o.locale === locale);

  const onOptionSelect = (idx: number) => {
    const nextLocale = options[idx].locale;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Dropdown
      options={options.map((option) => (
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
      ))}
      onOptionSelect={onOptionSelect}
      defaultIdx={defaultIdx}
    />
  );
};

export default LanguageDropdown;
