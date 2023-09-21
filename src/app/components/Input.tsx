"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

import EyeClosedIcon from "./icons/EyeClosed";
import EyeIcon from "./icons/Eye";
import { UseFormRegister } from "react-hook-form";

export type Types = "text" | "email" | "password" | "radio" | "checkbox";

interface Props {
  type?: Types;
  name?: string;
  value?: string | number;
  placeholder?: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  id: string;
  className?: string;
  withSubmitButton?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<any>;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      type = "text",
      name,
      value,
      placeholder,
      label,
      id,
      checked,
      defaultChecked,
      onChange,
      onBlur,
      onClick,
      onFocus,
      withSubmitButton,
      register,
    },
    ref
  ) => {
    const textClassname = "h-[52px] rounded-md border border-whiteGray3 p-4";

    const Text = () => (
      <>
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          id={id}
          className={twMerge(textClassname, "text text-grayWhite", className)}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          onFocus={onFocus}
          ref={ref}
          {...(register && register(id))}
        />
      </>
    );

    const TextWithSubmitButton = () => (
      <>
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
        <div className={twMerge("relative", className)}>
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            id={id}
            className={`${textClassname} text text-grayWhite w-full`}
            onChange={onChange}
            onClick={onClick}
            onFocus={onFocus}
            ref={ref}
            {...(register && register(id))}
          />
          <button className="button-small absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition">
            {withSubmitButton}
          </button>
        </div>
      </>
    );

    const Email = () => (
      <>
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
        <input
          type="email"
          value={value}
          placeholder={placeholder}
          id={id}
          className={twMerge(textClassname, "text text-grayWhite", className)}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          ref={ref}
          {...(register && register(id))}
        />
      </>
    );

    const Password = () => {
      const [isVisible, setIsvisible] = React.useState(false);

      return (
        <>
          <label className="sr-only" htmlFor={id}>
            {label}
          </label>
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              value={value}
              placeholder={placeholder}
              id={id}
              className={twMerge(
                textClassname,
                "text text-grayWhite w-full",
                className
              )}
              onChange={onChange}
              onClick={onClick}
              onFocus={onFocus}
              ref={ref}
              {...(register && register(id))}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition"
              onClick={(e) => (e.preventDefault(), setIsvisible(!isVisible))}
            >
              <span>{isVisible ? <EyeClosedIcon /> : <EyeIcon />}</span>
            </button>
          </div>
        </>
      );
    };

    const Radio = () => (
      <>
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
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
          onFocus={onFocus}
          ref={ref}
          {...(register && register(id))}
        />
      </>
    );

    const Checkbox = () => (
      <>
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
        <input
          type="checkbox"
          name={name}
          value={value}
          id={id}
          className={twMerge(
            "h-[18px] w-[18px] accent-grayWhite rounded",
            className
          )}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          ref={ref}
          {...(register && register(id))}
        />
      </>
    );

    switch (type) {
      case "text":
        return withSubmitButton ? TextWithSubmitButton() : Text();

      case "email":
        return Email();

      case "password":
        return Password();

      case "radio":
        return Radio();

      case "checkbox":
        return Checkbox();

      default:
        return Text();
    }
  }
);

Input.displayName = "Input";

export default Input;
