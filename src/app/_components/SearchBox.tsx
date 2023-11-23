"use state";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import debounce from "lodash.debounce";
import { useLocale, useTranslations } from "next-intl";

import Input from "./Input";
import SearchIcon from "./icons/Search";
import PlusIcon from "./icons/Plus";

import { useWindowSize } from "@/app/_hooks/useWindowSize";
import { breakPoints } from "@/app/_styles/constants";

import { trpc } from "../_trpc/client";

interface Props {
  className?: string;
  suggestionListStateControl: [boolean, (v: boolean) => void];
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

const SearchBox = ({ className, suggestionListStateControl }: Props) => {
  const t = useTranslations("SearchPage");

  const router = useRouter();
  const locale = useLocale();

  const [query, setQuery] = React.useState("");
  const debouncedSetQuery = debounce(setQuery, 100);

  const [isSuggestionListOpen, setIsSuggestionListOpen] =
    suggestionListStateControl;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { data, isFetching } = trpc.product.getAll.useQuery(
    { query, limit: 5 },
    { enabled: query.length > 1 }
  );

  const transformDataToStrings = [
    query,
    ...(data ?? []).reduce((acc, { name, brand }) => {
      const combinedProductName = `${brand} - ${name}`;

      const getStringContainingQuery = (s: string) =>
        s.toLowerCase().includes(query.toLowerCase()) ? s : combinedProductName;
      const fun = getStringContainingQuery;

      return acc.concat([fun(brand), fun(name)]);
    }, [] as string[]),
  ];
  const suggestions = Array.from(new Set(transformDataToStrings)).slice(0, 6);

  const onSuggestionSelect = () => {
    setIsSuggestionListOpen(false);
    inputRef.current && inputRef.current.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${query}`);
      onSuggestionSelect();
    }
  };

  React.useEffect(() => {
    if (query.length > 1) setIsSuggestionListOpen(true);
    else setIsSuggestionListOpen(false);

    inputRef.current && inputRef.current.focus();
  }, [query]);

  React.useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (isSuggestionListOpen && !wrapperRef.current?.contains(e.target)) {
        setIsSuggestionListOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isSuggestionListOpen]);

  return (
    <div className="sm:max-w-xs relative" ref={wrapperRef}>
      <Input
        label="search"
        id="search"
        placeholder={t("inputPlaceholder")}
        className={twMerge("w-full", className)}
        value={query}
        onChange={(e) => debouncedSetQuery(e.target.value)}
        onFocus={() => query.length > 1 && setIsSuggestionListOpen(true)}
        onKeyDown={onKeyDown}
        autocomplete="off"
        withSubmitButtonClassName={
          isSuggestionListOpen ? "" : " pointer-events-none"
        }
        withSubmitButtonContent={() => (
          <PlusIcon
            className={twMerge(
              "transition stroke-darkGray hover:opacity-60 rotate-45",
              isSuggestionListOpen ? "" : "opacity-0 pointer-events-none"
            )}
          />
        )}
        onClick={() => setQuery("")}
        ref={inputRef}
      />

      <div
        className={twMerge(
          "absolute bg-white border border-darkGray rounded-b-md w-[98%] left-[1%] overflow-hidden transition",
          isSuggestionListOpen ? "" : "pointer-events-none opacity-0"
        )}
      >
        <ul className="flex flex-col text">
          {isFetching ? (
            <li key={"loading"} className="p-2 py-3 cursor-pointer">
              Loading...
            </li>
          ) : (
            suggestions.map((item, i) => (
              <li
                key={i}
                className="p-2 py-3 hover:font-medium hover:bg-whiteGray"
              >
                <Link
                  href={`/${locale}/search?query=${item}`}
                  className="flex gap-3"
                  onClick={onSuggestionSelect}
                >
                  <span className="text-darkGray">
                    <SearchIcon />
                  </span>{" "}
                  <p className="truncate">{item}</p>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBox;
