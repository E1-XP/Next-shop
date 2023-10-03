"use client";

import * as React from "react";
import {
  autoUpdate,
  useFloating,
  shift,
  useClick,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";

import CaretUpIcon from "./icons/CaretUp";

interface Props {
  showIndicator?: boolean;
  options: string[] | React.ReactElement[];
}

const Dropdown = ({ options, showIndicator = true }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [shift()],
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

  const [activeIdx, setActiveIdx] = React.useState(0);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const onItemClick = (i: number) => {
    setActiveIdx(i);
    toggleIsOpen();
  };

  return (
    <div className="relative">
      <button
        className={`paragraph font-semibold font-display flex items-center gap-1 hover:opacity-70 ${
          isOpen ? "opacity-70" : ""
        }`}
        onClick={toggleIsOpen}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {options[activeIdx]}
        {showIndicator && (
          <CaretUpIcon className="rotate-180 w-3 text-darkGray h-min" />
        )}
      </button>
      {isOpen && (
        <ul
          className="bg-white border border-grayWhite w-max min-w-full rounded-md absolute z-50 py-2 $"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
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
      )}
    </div>
  );
};

export default Dropdown;
