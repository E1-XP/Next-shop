"use client";

import * as React from "react";
import {
  useFloating,
  offset,
  autoUpdate,
  shift,
  useTransitionStyles,
  useClick,
  useInteractions,
  useDismiss,
} from "@floating-ui/react";
import { twMerge } from "tailwind-merge";

interface Props {
  referenceContent: (isOpen: boolean) => React.JSX.Element;
  referenceContentClass?: string;
  children: React.ReactNode;
  buttonLabelText: string;
}

const Widget = ({
  children,
  referenceContent,
  referenceContentClass,
  buttonLabelText,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [shift(), offset({ mainAxis: 12 })],
    open: isOpen,
    onOpenChange: setIsOpen,
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
      transform: "translateY(-12px)",
    },
  });

  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className="relative z-50 w-max"
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      <button
        onClick={toggleIsOpen}
        className={twMerge("flex items-center", referenceContentClass)}
        aria-label={buttonLabelText}
      >
        {referenceContent(isOpen)}
      </button>
      {isMounted && (
        <div
          className="absolute left-0 top-0"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <div
            className="bg-white p-4 rounded-md border border-grayWhite gap-6 flex-col items-center flex w-80 min-h-[280px]"
            style={styles}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Widget;
