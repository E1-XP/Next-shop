import * as React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  alt?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  asLink?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const Button = ({
  children,
  className,
  alt = false,
  rounded = false,
  disabled = false,
  type = "button",
  asLink = false,
  href,
  onClick,
}: React.PropsWithChildren<Props>) => {
  const standardClassName = "bg-darkGray2 text-white";
  const altClassName = "bg-white text-darkGray2";

  const SelectedTag = asLink ? "a" : "button";

  return (
    <SelectedTag
      type={asLink ? undefined : type}
      href={asLink ? href : undefined}
      className={twMerge(
        "py-2.5 px-[26px] hover:opacity-90 transition font-display text-lg font-medium leading-8 -tracking-[0.4px] disabled:cursor-not-allowed",
        alt ? altClassName : standardClassName,
        rounded ? "rounded-md" : "",
        className
      )}
      disabled={!asLink && disabled}
      onClick={onClick}
    >
      {children}
    </SelectedTag>
  );
};

export default Button;
