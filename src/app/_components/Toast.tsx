"use client";

import { ToastContainer, toast, TypeOptions } from "react-toastify";
import { twMerge } from "tailwind-merge";

import "react-toastify/dist/ReactToastify.min.css";

import QuestionCircleIcon from "./icons/QuestionCircle";

const iconColors = {
  error: "stroke-red-500",
  success: "stroke-green-500",
  info: "stroke-white",
} as Record<TypeOptions, string>;

const progressColors = {
  error: "bg-red-500",
  success: "bg-green-500",
  info: "bg-white",
} as Record<TypeOptions, string>;

const Toast = () => {
  return (
    <ToastContainer
      position={toast.POSITION.BOTTOM_RIGHT}
      toastClassName="paragraph leading-6 text-white bg-darkGray rounded-md"
      icon={({ type }) => <QuestionCircleIcon className={iconColors[type]} />}
      progressClassName={(opts) =>
        twMerge(
          opts?.defaultClassName,
          progressColors[opts?.type!],
          "border-b border-darkGray"
        )
      }
      autoClose={2000}
    />
  );
};

export default Toast;
