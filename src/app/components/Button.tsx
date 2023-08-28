import * as React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

const Button = ({ children, className }: React.PropsWithChildren<Props>) => {
  return (
    <button
      className={twMerge(
        "bg-darkGray2 text-white py-2.5 px-[26px] hover:opacity-90 transition font-display text-lg font-medium leading-8 -tracking-[0.4px]",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
