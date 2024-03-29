"use state";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import debounce from "lodash.debounce";
import { useLocale, useTranslations } from "next-intl";

import Input from "./Input";
import SearchIcon from "./icons/Search";
import PlusIcon from "./icons/Plus";

import { Link, usePathname, useRouter } from "@/navigation";
import { trpc } from "../_trpc/client";

interface Props {
  className?: string;
  suggestionListStateControl: [boolean, (v: boolean) => void];
  isMenuOpenStateControl: [boolean, (v: boolean) => void];
}

const SearchBox = ({
  className,
  suggestionListStateControl,
  isMenuOpenStateControl,
}: Props) => {
  const t = useTranslations("SearchPage");

  const suggestionListItemsRef = React.useRef<Array<HTMLLIElement | null>>([]);
  const [selectedListItemIdx, setSelectedListItemIdx] = React.useState(-1);

  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const [query, setQuery] = React.useState("");
  const [shouldFetch, setShouldFetch] = React.useState(true);

  const debouncedShouldFetch = React.useCallback(
    debounce(() => setShouldFetch(true), 500),
    []
  );

  const onSearchChange = (s: string) => {
    setQuery(s);

    setShouldFetch(false);
    debouncedShouldFetch();
  };

  const [isSuggestionListOpen, setIsSuggestionListOpen] =
    suggestionListStateControl;
  const [isMenuOpen, setIsMenuOpen] = isMenuOpenStateControl;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { data, isFetching } = trpc.product.getAll.useQuery(
    { query, perPage: 10, page: 1 },
    { enabled: query.length > 1 && shouldFetch }
  );

  const transformDataToStrings = [
    query,
    ...(data?.products ?? []).reduce((acc, { name, brand }) => {
      const combinedProductName = `${brand} - ${name}`;

      const getStringContainingQueryOrFullProductName = (s: string) =>
        s.toLowerCase().includes(query.toLowerCase()) ? s : combinedProductName;

      return acc.concat([
        getStringContainingQueryOrFullProductName(brand),
        getStringContainingQueryOrFullProductName(name),
      ]);
    }, [] as string[]),
  ];
  const suggestions = Array.from(new Set(transformDataToStrings)).slice(0, 6);

  const onSuggestionSelect = () => {
    setIsSuggestionListOpen(false);
    setIsMenuOpen(false);

    inputRef.current && inputRef.current.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSuggestionListOpen(false);
    }

    if (e.key === "Enter") {
      if (selectedListItemIdx !== -1) {
        const selectedSuggestion = suggestions[selectedListItemIdx];

        setQuery(selectedSuggestion);
        router.push(
          `/search?${new URLSearchParams({ query: selectedSuggestion })}`
        );
      } else router.push(`/search?${new URLSearchParams({ query })}`);

      onSuggestionSelect();
    }

    if (e.key === "ArrowDown") {
      if (!suggestionListItemsRef.current) return;

      if (selectedListItemIdx < suggestionListItemsRef.current.length - 1) {
        setSelectedListItemIdx(selectedListItemIdx + 1);
      } else setSelectedListItemIdx(0);
    }

    if (e.key === "ArrowUp") {
      if (!suggestionListItemsRef.current) return;

      if (selectedListItemIdx > 0) {
        setSelectedListItemIdx(selectedListItemIdx - 1);
      } else setSelectedListItemIdx(suggestionListItemsRef.current.length - 1);
    }
  };

  React.useEffect(() => {
    suggestionListItemsRef.current = suggestionListItemsRef.current.slice(
      0,
      suggestions.length
    );
  }, [suggestions]);

  React.useEffect(() => {
    if (query.length > 1) setIsSuggestionListOpen(true);
    else setIsSuggestionListOpen(false);

    inputRef.current && inputRef.current.focus();
  }, [query]);

  React.useEffect(() => {
    if (!pathname.endsWith("/search")) setQuery("");
  }, [pathname]);

  React.useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (isSuggestionListOpen && !wrapperRef.current?.contains(e.target)) {
        setIsSuggestionListOpen(false);
      }
    };

    if (!isSuggestionListOpen) setSelectedListItemIdx(-1);

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
        onChange={(e) => onSearchChange(e.target.value)}
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
            <li
              key={"loading"}
              className="p-2 py-3 cursor-pointer"
              tabIndex={0}
            >
              Loading...
            </li>
          ) : (
            suggestions.map((hint, i) => (
              <li
                key={i}
                className={twMerge(
                  "p-2 py-3 hover:font-medium hover:bg-whiteGray",
                  selectedListItemIdx === i ? "bg-whiteGray font-medium" : ""
                )}
                tabIndex={0}
                ref={(el) => (suggestionListItemsRef.current[i] = el)}
              >
                <Link
                  href={`/${locale}/search?${new URLSearchParams({
                    query: hint,
                  })}`}
                  className="flex gap-3"
                  onClick={onSuggestionSelect}
                  aria-label={hint}
                >
                  <span className="text-darkGray">
                    <SearchIcon />
                  </span>{" "}
                  <p className="truncate">{hint}</p>
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
