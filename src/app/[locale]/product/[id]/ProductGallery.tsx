"use client";

import Image from "next/image";
import * as React from "react";

import { Product } from "@prisma/client";

import GalleryModal from "./GalleryModal";
import Slider from "./Slider";
import { twMerge } from "tailwind-merge";

interface Props {
  data: Product;
  className?: string;
}

const ProductGallery = ({ data, className }: Props) => {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const galleryWrapper = React.useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!galleryWrapper.current) return;

    const rect = galleryWrapper.current?.getBoundingClientRect();
    const yPos = Math.max(0, Math.floor(e.pageY - rect.top));
    const xPos = Math.max(0, Math.floor(e.pageX - rect.left));

    const x = (xPos / rect.width) * 100;
    const y = (yPos / rect.height) * 100;

    setCoords({ x, y });
  };

  const onThumbClick = (i: number) => {
    setActiveIdx(i);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={twMerge("flex flex-col md:flex-row gap-4", className)}>
        <div className="hidden md:flex md:flex-col gap-4 basis-1/6">
          {data.images.map((img, i) => (
            <button
              key={img}
              className={twMerge(
                "border-2",
                activeIdx === i ? "border-darkGray" : "border-transparent"
              )}
              onClick={() => onThumbClick(i)}
              onMouseMove={() => setActiveIdx(i)}
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
          className="hidden md:block md:basis-5/6 max-md:-order-1 overflow-hidden group cursor-zoom-in"
          onMouseMove={onMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => setIsModalOpen(true)}
          ref={galleryWrapper}
        >
          <Image
            src={data.images[activeIdx]}
            alt={data.name}
            width={1800}
            height={2600}
            className="pointer-events-none group-hover:object-none"
            style={{
              objectPosition: isHovering
                ? `${coords.x}% ${coords.y}%`
                : undefined,
            }}
            priority
          />
        </div>
        <Slider data={data} className="md:!hidden" />
      </div>
      <GalleryModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        data={data}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
      />
    </>
  );
};

export default ProductGallery;
