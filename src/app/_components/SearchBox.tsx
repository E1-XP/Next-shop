import * as React from "react";
import { twMerge } from "tailwind-merge";

import Input from "./Input";
import SearchIcon from "./icons/Search";
import PlusIcon from "./icons/Plus";

import { useWindowSize } from "@/app/_hooks/useWindowSize";
import { breakPoints } from "@/app/_styles/constants";

interface Props {
  className?: string;
}

interface IconProps {
  className?: string;
  isSearchBoxOpen: boolean;
  setIsSearchBoxOpen: (v: boolean) => void;
}

export const SearchIconMenu = ({
  className,
  isSearchBoxOpen,
  setIsSearchBoxOpen,
}: IconProps) => {
  const { width } = useWindowSize();

  return (
    <div className="h-[72px] overflow-hidden">
      <div
        className={twMerge(
          "flex flex-col gap-6 py-6 transition",
          isSearchBoxOpen ? "sm:!-translate-y-[46px]" : ""
        )}
      >
        <button
          onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}
          disabled={width < breakPoints.SM && isSearchBoxOpen}
          className={twMerge(
            "flex justify-center",
            isSearchBoxOpen ? "max-sm:opacity-0" : ""
          )}
        >
          <SearchIcon
            className={twMerge(
              "transition stroke-darkGray hover:opacity-60",
              className
            )}
          />
        </button>
        <button
          onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}
          className="flex justify-center"
        >
          <PlusIcon
            className={twMerge(
              "transition stroke-darkGray hover:opacity-60 rotate-45 w-8 h-8 -mt-[5px]",
              className
            )}
          />
        </button>
      </div>
    </div>
  );
};

const SearchBox = ({ className }: Props) => {
  return (
    <Input
      label="search"
      id="search"
      placeholder="Type here to search..."
      className={twMerge("w-full max-w-xs", className)}
    />
  );
};

export default SearchBox;
