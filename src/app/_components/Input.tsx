"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { UseFormRegister } from "react-hook-form";

import EyeClosedIcon from "./icons/EyeClosed";
import EyeIcon from "./icons/Eye";

export type Types =
  | "text"
  | "email"
  | "password"
  | "radio"
  | "checkbox"
  | "textarea";

type ComponentTypes = HTMLInputElement | HTMLTextAreaElement;

interface Props<T extends ComponentTypes> {
  type?: Types;
  name?: string;
  value?: string | number;
  placeholder?: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  autocomplete?: "off" | "on";
  id: string;
  className?: string;
  withSubmitButtonContent?: () => React.ReactNode;
  withSubmitButtonClassName?: string;
  onChange?: (e: React.ChangeEvent<T>) => void;
  onBlur?: () => void;
  onClick?: (e: React.MouseEvent<T>) => void;
  onFocus?: (e: React.FocusEvent<T>) => void;
  register?: UseFormRegister<any>;
}

const Input = React.forwardRef<ComponentTypes, Props<any>>(
  (
    {
      className,
      type = "text",
      name,
      value,
      placeholder,
      autocomplete,
      label,
      id,
      checked,
      defaultChecked,
      onChange,
      onBlur,
      onClick,
      onFocus,
      withSubmitButtonContent,
      withSubmitButtonClassName,
      register,
    },
    ref
  ) => {
    const baseClassName =
      "h-[52px] rounded-md border border-whiteGray3 p-4 paragraph text-grayWhite";

    const Text = () => (
      <>
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          autoComplete={autocomplete}
          id={id}
          className={twMerge(baseClassName, className)}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          onFocus={onFocus}
          ref={ref as React.LegacyRef<HTMLInputElement>}
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
            autoComplete={autocomplete}
            id={id}
            className={twMerge(baseClassName, "w-full")}
            onChange={onChange}
            onFocus={onFocus}
            ref={ref as React.LegacyRef<HTMLInputElement>}
            {...(register && register(id))}
          />
          <button
            className={twMerge(
              "button-small absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition",
              withSubmitButtonClassName
            )}
            onClick={onClick}
          >
            {withSubmitButtonContent && withSubmitButtonContent()}
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
          autoComplete={autocomplete}
          id={id}
          className={twMerge(baseClassName, className)}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          ref={ref as React.LegacyRef<HTMLInputElement>}
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
              autoComplete={autocomplete}
              id={id}
              className={twMerge(baseClassName, "w-full", className)}
              onChange={onChange}
              onClick={onClick}
              onFocus={onFocus}
              ref={ref as React.LegacyRef<HTMLInputElement>}
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
          autoComplete={autocomplete}
          id={id}
          className={twMerge("h-[18px] w-[18px]", className)}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          ref={ref as React.LegacyRef<HTMLInputElement>}
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
          autoComplete={autocomplete}
          className={twMerge(
            "h-[18px] w-[18px] accent-grayWhite rounded",
            className
          )}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          ref={ref as React.LegacyRef<HTMLInputElement>}
          {...(register && register(id))}
        />
      </>
    );

    const Textarea = () => (
      <>
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
        <textarea
          value={value}
          placeholder={placeholder}
          id={id}
          className={twMerge(baseClassName, "resize-none", className)}
          autoComplete={autocomplete}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          ref={ref as React.LegacyRef<HTMLTextAreaElement>}
          {...(register && register(id))}
        />
      </>
    );

    switch (type) {
      case "text":
        return withSubmitButtonContent ? TextWithSubmitButton() : Text();

      case "email":
        return Email();

      case "password":
        return Password();

      case "radio":
        return Radio();

      case "checkbox":
        return Checkbox();

      case "textarea":
        return Textarea();

      default:
        return Text();
    }
  }
);

Input.displayName = "Input";

export default Input;
