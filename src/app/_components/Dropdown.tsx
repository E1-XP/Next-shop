"use client";

import * as React from "react";

import CaretUpIcon from "./icons/CaretUp";

interface Props {
  showIndicator?: boolean;
  options: string[] | React.ReactElement[];
}

const Dropdown = ({ options, showIndicator = true }: Props) => {
  const [referenceElement, setReferenceElement] = React.useState<any>(null);
  const [popperElement, setPopperElement] = React.useState<any>(null);

  // const { styles, attributes, update } = usePopper(
  //   referenceElement,
  //   popperElement,
  //   { placement: "top" }
  // );

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
    // update && update();
  };

  const onItemClick = (i: number) => {
    setActiveIdx(i);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button
          className={`paragraph font-semibold font-display flex items-center gap-1 hover:opacity-70 ${
            isOpen ? "opacity-70" : ""
          }`}
          onClick={toggleIsOpen}
          ref={setReferenceElement}
        >
          {options[activeIdx]}
          {showIndicator && (
            <CaretUpIcon className="rotate-180 w-3 text-darkGray h-min" />
          )}
        </button>
        <ul
          className={`bg-white border border-grayWhite w-max min-w-full rounded-md absolute z-50 py-2 ${
            isOpen ? "" : "hidden"
          }`}
          ref={setPopperElement}
          // style={ }
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
      <div
        className={`opacity-0 pointer-events-none absolute top-0 left-0 w-full h-full z-40 ${
          isOpen ? "pointer-events-auto" : ""
        }`}
        onClick={toggleIsOpen}
      ></div>
    </>
  );
};

export default Dropdown;
