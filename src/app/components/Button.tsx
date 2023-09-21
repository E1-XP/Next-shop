import * as React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  alt?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent) => void;
}

const Button = ({
  children,
  className,
  alt = false,
  disabled = false,
  type = "button",
  onClick,
}: React.PropsWithChildren<Props>) => {
  const standardClassName = "bg-darkGray2 text-white";
  const altClassName = "bg-white text-darkGray2";

  return (
    <button
      type={type}
      className={twMerge(
        "py-2.5 px-[26px] hover:opacity-90 transition font-display text-lg font-medium leading-8 -tracking-[0.4px] disabled:cursor-not-allowed",
        alt ? altClassName : standardClassName,
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
