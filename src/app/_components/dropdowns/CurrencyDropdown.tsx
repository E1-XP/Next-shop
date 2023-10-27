"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import Skeleton from "react-loading-skeleton";

import Dropdown from "../Dropdown";

import { useGlobalStore } from "@/app/_store/global";
import { useHydrate } from "@/app/_hooks/useHydrate";
import { currencies } from "@/app/_helpers/constants";

interface Option {
  text: (typeof currencies)[number];
}

interface Props {
  options: Option[];
}

const CurrencyDropdown = ({ options }: Props) => {
  const { setCurrency, currency } = useGlobalStore();
  const isHydrating = useHydrate();

  const locale = useLocale();

  const setDefaultCurrencyForLocale = () => {
    const actualCurrency = locale === "en" ? "usd" : "pln";
    setCurrency(actualCurrency);
  };

  React.useEffect(() => {
    const isFirstVisit = localStorage.getItem("isCurrencySelected") === null;

    if (isFirstVisit) {
      localStorage.setItem("isCurrencySelected", "true");
      setDefaultCurrencyForLocale();
    }
  }, []);

  const onSelect = (idx: number) => {
    const currency = options[idx].text;
    setCurrency(currency);
  };

  const getDefaultIdx = () => {
    const idx = options.findIndex((opt) => opt.text === currency);
    return idx !== -1 ? idx : undefined;
  };

  if (isHydrating) return <Skeleton containerClassName="w-[45px]" />;

  return (
    <Dropdown
      options={options.map((option) => option.text.toUpperCase())}
      onOptionSelect={onSelect}
      defaultIdx={getDefaultIdx()}
    />
  );
};

export default CurrencyDropdown;
