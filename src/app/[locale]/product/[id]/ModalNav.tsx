import * as React from "react";
import { twMerge } from "tailwind-merge";

import PlusIcon from "@/app/_components/icons/Plus";
import ChevronRightIcon from "@/app/_components/icons/ChevronRight";

import { Product } from "@prisma/client";

interface Props {
  activeIdx: number;
  data: Product;
  closeModal: () => void;
  setActiveIdx: (i: number) => void;
  className?: string;
}

const ModalNav = ({
  activeIdx,
  data,
  closeModal,
  setActiveIdx,
  className,
}: Props) => {
  const prevImg = () =>
    setActiveIdx(activeIdx - 1 < 0 ? data.images.length - 1 : activeIdx - 1);
  const nextImg = () =>
    setActiveIdx(activeIdx + 1 > data.images.length - 1 ? 0 : activeIdx + 1);

  return (
    <div
      className={twMerge(
        "bg-white fixed z-40 bottom-0 left-0 w-full h-[72px] flex justify-between items-center p-4 border-y border-whiteGray2",
        className
      )}
    >
      <span className="font-body text-darkGray">
        {activeIdx + 1} / {data.images.length}
      </span>
      <div className="flex gap-4">
        <button className="hover:opacity-60 transition" onClick={prevImg}>
          <ChevronRightIcon className="rotate-180 h-8 w-8 stroke-darkGray" />
        </button>
        <button className="hover:opacity-60 transition" onClick={nextImg}>
          <ChevronRightIcon className="h-8 w-8 stroke-darkGray" />
        </button>
        <button
          className="hover:opacity-60 transition ml-5"
          onClick={closeModal}
        >
          <PlusIcon className="rotate-45 h-8 w-8 stroke-darkGray" />
        </button>
      </div>
    </div>
  );
};

export default ModalNav;
