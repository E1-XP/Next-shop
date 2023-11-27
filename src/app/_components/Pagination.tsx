import * as React from "react";
import { twMerge } from "tailwind-merge";
import ChevronRightIcon from "./icons/ChevronRight";

interface Props {
  className?: string;
  pageControl: [number, (n: number) => void];
  total: number;
  perPage: number;
}

const Pagination = ({ className, pageControl, total, perPage }: Props) => {
  const [page, setPage] = pageControl;

  const numberOfPages = Math.floor(total / perPage);

  return (
    <div className={twMerge(className, "flex gap-1.5")}>
      <button
        className="h-8 aspect-square bg-white border border-darkGray rounded-md text-darkGray button-small transition hover:bg-whiteGray2 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={page <= 1}
        onClick={() => setPage(Math.max(page - 1, 1))}
      >
        <ChevronRightIcon className="rotate-180" />
      </button>
      {Array(total !== 0 ? numberOfPages : 1)
        .fill(null)
        .map((_, i) => (
          <button
            key={i}
            className={twMerge(
              "aspect-square w-8 bg-white border border-darkGray rounded-md text-darkGray button-small transition hover:bg-whiteGray2",
              page === i + 1
                ? "text-white bg-darkGray hover:bg-darkGray hover:opacity-80"
                : ""
            )}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      <button
        className="h-8 aspect-square bg-white border border-darkGray rounded-md text-darkGray button-small transition hover:bg-whiteGray2 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={page >= numberOfPages}
        onClick={() => setPage(Math.min(page + 1, numberOfPages))}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
