"use client";

import * as React from "react";
import Modal from "react-modal";
import { useTranslations } from "next-intl";

import PlusIcon from "@/app/_components/icons/Plus";
import Rating from "@/app/_components/Rating";
import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const ReviewModal = ({ isOpen, closeModal }: Props) => {
  const t = useTranslations("Product.Reviews");

  const data = { buttonText: "Send", heading: "Compose your review" };

  return (
    <Modal
      id="gallery-modal"
      isOpen={isOpen}
      style={{
        content: {
          height: "fit-content",
          inset: "none",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "320px",
          width: "80%",
          maxWidth: "900px",
        },
      }}
      closeTimeoutMS={200}
    >
      <form className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text font-semibold">{data.heading}</p>
          <button onClick={closeModal} className="">
            <PlusIcon className="rotate-45 h-8 w-8 opacity-60 hover:opacity-100 transition" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            type="textarea"
            label="review"
            placeholder="Your review"
            id="review"
            className="w-full h-52 mini-scrollbar"
          />
          <Input
            label="username"
            id="username"
            placeholder="Username"
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between gap-8">
          <Rating rate={0} />
          <Button rounded>{data.buttonText}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReviewModal;
