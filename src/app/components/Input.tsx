import * as React from "react";
import { twMerge } from "tailwind-merge";

type Types = "text" | "radio";

interface Props {
  type?: Types;
  name?: string;
  value?: string | number;
  placeholder?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  id?: string;
  className?: string;
  withSubmitButton?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const input = ({
  className,
  type = "text",
  name,
  value,
  placeholder,
  id,
  checked,
  defaultChecked,
  onChange,
  onClick,
  withSubmitButton,
}: Props) => {
  const textClassname = "h-[52px] rounded-md border border-whiteGray3 p-4";

  const Text = (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      id={id}
      className={twMerge(textClassname, "text text-grayWhite", className)}
      onChange={onChange}
      onClick={onClick}
    />
  );

  const TextWithSubmitButton = (
    <div className={twMerge("relative", className)}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        id={id}
        className={`${textClassname} text text-grayWhite w-full`}
        onChange={onChange}
        onClick={onClick}
      />
      <button className="button-small absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition">
        {withSubmitButton}
      </button>
    </div>
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
      return withSubmitButton ? TextWithSubmitButton : Text;

    case "radio":
      return Radio;

    default:
      return Text;
  }
};

export default input;
