"use client";

import * as React from "react";
import Image from "next/image";
import Modal from "react-modal";

import { Product } from "@prisma/client";

import PlusIcon from "@/app/components/icons/Plus";

Modal.setAppElement("#modals");

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  data: Product;
}

const GalleryModal = ({ isOpen, closeModal, data }: Props) => {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [isMainImgZoomed, setIsMainImgZoomed] = React.useState(false);

  const galleryWrapper = React.useRef<HTMLDivElement | null>(null);
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  const onMainImgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMainImgZoomed(!isMainImgZoomed);
    if (!galleryWrapper.current) return;

    const rect = galleryWrapper.current.getBoundingClientRect();
    const prevHeight = rect.height;

    requestAnimationFrame(() => {
      if (!galleryWrapper.current) return;
      const rect = galleryWrapper.current.getBoundingClientRect();

      const yPos = Math.max(0, Math.floor(e.pageY - rect.top));
      const y = (yPos / prevHeight) * rect.height;

      if (!modalRef.current) return;
      modalRef.current.scroll(0, Math.max(0, y - rect.height * 0.1));
    });
  };

  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else {
      document.body.style.overflow = "auto";
      setIsMainImgZoomed(false);
    }
  }, [isOpen]);

  return (
    <Modal
      id="gallery-modal"
      contentRef={(node) => (modalRef.current = node)}
      isOpen={isOpen}
      style={{
        content: {
          inset: "0",
          padding: "0",
          border: "none",
          maxHeight: "100vh",
        },
        overlay: { zIndex: "999" },
      }}
    >
      <button onClick={closeModal} className="fixed right-4 top-4 z-40">
        <PlusIcon className="rotate-45 h-8 w-8 opacity-60 hover:opacity-100 transition" />
      </button>
      <div className="">
        <div className="flex md:flex-col gap-4 fixed w-[125px] p-6 z-40">
          {data.images.map((img, i) => (
            <button
              key={img}
              className={`border-2 ${
                activeIdx === i ? "border-darkGray" : "border-transparent"
              }`}
              onClick={() => setActiveIdx(i)}
              onMouseOver={() => setActiveIdx(i)}
            >
              <Image
                src={img}
                alt={data.name}
                width={1800}
                height={2600}
                className="pointer-events-none"
              />
            </button>
          ))}
        </div>
        <div
          className={
            isMainImgZoomed
              ? "cursor-zoom-out h-full overflow-hidden"
              : "cursor-zoom-in h-screen"
          }
          ref={galleryWrapper}
          onClick={onMainImgClick}
        >
          <Image
            src={data.images[activeIdx]}
            alt={data.name}
            width={1800}
            height={2600}
            className={`pointer-events-none mx-auto relative ${
              isMainImgZoomed ? "w-max h-auto" : "h-full w-auto "
            }`}
          />
        </div>
      </div>
    </Modal>
  );
};

export default GalleryModal;
