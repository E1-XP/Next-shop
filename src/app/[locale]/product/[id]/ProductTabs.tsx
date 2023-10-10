"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

interface Data {
  tabName: string;
  content: string;
}

interface Props {
  className?: string;
  data: Data[];
}

const Tabs = ({ className, data }: Props) => {
  const [activeTabIdx, setActiveTabIdx] = React.useState(0);

  return (
    <div
      className={twMerge("flex max-md:gap-4 flex-col md:flex-row", className)}
    >
      <div className="basis-1/5 flex flex-row md:flex-col gap-6">
        {data.map((tab, i) => (
          <button
            key={tab.tabName}
            className={`w-min font-display text-xl font-medium leading-7  pb-1 hover:text-darkGray2 ${
              activeTabIdx === i
                ? "border-b  border-darkGray2 text-darkGray2"
                : "text-grayWhite"
            }`}
            onClick={() => setActiveTabIdx(i)}
          >
            {tab.tabName}
          </button>
        ))}
      </div>
      <div className="basis-4/5 relative min-h-[320px]">
        <div // duplicated active slide to maintain container height of absolute positioned tabs
          aria-hidden="true"
          className="bg-white whitespace-pre-wrap top-0 left-0 w-full transition text-lg font-normal font-body leading-[30px] opacity-0"
        >
          {data[activeTabIdx].content}
        </div>
        {data.map((tab, i) => (
          <div
            key={tab.tabName}
            className={`bg-white whitespace-pre-wrap absolute top-0 left-0 w-full transition text-lg font-normal font-body leading-[30px] ${
              i === activeTabIdx ? "opacity-100" : "opacity-0"
            }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
