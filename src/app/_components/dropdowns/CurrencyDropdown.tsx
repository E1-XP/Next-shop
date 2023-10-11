"use client";

import * as React from "react";

import Dropdown from "../Dropdown";

interface Option {
  text: string;
}

interface Props {
  options: Option[];
}

const CurrencyDropdown = ({ options }: Props) => {
  return <Dropdown options={options.map((option) => option.text)} />;
};

export default CurrencyDropdown;
