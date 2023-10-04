"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Toast = () => {
  return (
    <ToastContainer
      position={toast.POSITION.BOTTOM_RIGHT}
      toastClassName="text leading-6 text-white bg-darkGray rounded-md"
      autoClose={2000}
    />
  );
};

export default Toast;
