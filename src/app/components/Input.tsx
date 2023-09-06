import * as React from "react";
import { twMerge } from "tailwind-merge";

type Types = "text" | "radio";

interface Props {
  type?: Types;
  name?: string;
  value?: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
  id?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const input = ({
  className,
  type = "text",
  name,
  value,
  id,
  checked,
  defaultChecked,
  onChange,
  onClick,
}: Props) => {
  const Text = (
    <input
      type="text"
      value={value}
      id={id}
      className={twMerge("", className)}
      onChange={onChange}
      onClick={onClick}
    />
  );

  const Radio = (
    <input
      type="radio"
      name={name}
      value={value}
      id={id}
      className={twMerge("h-[18px] w-[18px]", className)}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
      onClick={onClick}
    />
  );

  switch (type) {
    case "text":
      return Text;

    case "radio":
      return Radio;

    default:
      return Text;
  }
};

export default input;
