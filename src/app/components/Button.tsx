import * as React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  alt?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const Button = ({
  children,
  className,
  alt = false,
  onClick,
}: React.PropsWithChildren<Props>) => {
  const standardClassName = "bg-darkGray2 text-white";
  const altClassName = "bg-white text-darkGray2";

  return (
    <button
      className={twMerge(
        "py-2.5 px-[26px] hover:opacity-90 transition font-display text-lg font-medium leading-8 -tracking-[0.4px]",
        alt ? altClassName : standardClassName,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
