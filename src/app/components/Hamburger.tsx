import * as React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const Hamburger = ({ className, isOpen, setIsOpen }: Props) => {
  return (
    <button
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
      className={twMerge(
        "h-12 w-14 p-4 flex flex-col items-center justify-center gap-1",
        className
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span
        aria-hidden="true"
        className={`bg-darkGray h-[2px] w-full rounded block transition ${
          isOpen ? "rotate-45 translate-y-[6px]" : ""
        }`}
      ></span>
      <span
        aria-hidden="true"
        className={`bg-darkGray h-[2px] w-full rounded block transition ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      <span
        aria-hidden="true"
        className={`bg-darkGray h-[2px] w-full rounded block transition ${
          isOpen ? "-rotate-45 -translate-y-[6px]" : ""
        }`}
      ></span>
    </button>
  );
};

export default Hamburger;
