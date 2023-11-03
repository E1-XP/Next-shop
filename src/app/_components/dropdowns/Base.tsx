"use client";

import * as React from "react";
import {
  autoUpdate,
  useFloating,
  shift,
  offset,
  useClick,
  useDismiss,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { twMerge } from "tailwind-merge";

import CaretUpIcon from "../icons/CaretUp";

interface Props {
  showIndicator?: boolean;
  options: string[] | React.ReactElement[];
  onOptionSelect?: (idx: number) => void;
  defaultIdx?: number;
}

const Dropdown = ({
  options,
  onOptionSelect,
  showIndicator = true,
  defaultIdx,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [shift(), offset({ mainAxis: -8 })],
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 250,
    initial: {
      opacity: 0,
      transform: "translateY(8px)",
    },
  });

  const [activeIdx, setActiveIdx] = React.useState(() => defaultIdx ?? 0);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const onItemClick = (i: number) => {
    setActiveIdx(i);
    onOptionSelect && onOptionSelect(i);
    toggleIsOpen();
  };

  return (
    <div className="relative">
      <button
        className={twMerge(
          "paragraph font-semibold font-display flex items-center gap-1 hover:opacity-70",
          isOpen ? "opacity-70" : ""
        )}
        onClick={toggleIsOpen}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {options[activeIdx]}
        {showIndicator && (
          <CaretUpIcon className="rotate-180 w-3 text-darkGray h-min" />
        )}
      </button>
      {isMounted && (
        <div
          ref={refs.setFloating}
          className="absolute z-50 py-2"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <ul
            className="bg-white border border-grayWhite w-max min-w-full rounded-md overflow-hidden"
            style={styles}
          >
            {options.map((option, i) => (
              <li
                key={i}
                className="flex py-1 px-4 cursor-pointer paragraph font-display font-semibold hover:bg-whiteGray"
                onClick={() => onItemClick(i)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
