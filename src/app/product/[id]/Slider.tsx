"use client";

import * as React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { Product } from "@prisma/client";

import "swiper/css";
import "swiper/css/navigation";
import { twMerge } from "tailwind-merge";
import ChevronRightIcon from "@/app/_components/icons/ChevronRight";

interface Props {
  data: Product;
  className?: string;
}

const Slider = ({ data, className }: Props) => {
  const [prevEl, setPrevEl] = React.useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = React.useState<HTMLButtonElement | null>(null);

  return (
    <Swiper
      slidesPerView={1}
      autoplay={false}
      loop={true}
      navigation={{ prevEl, nextEl }}
      modules={[Navigation]}
      className={twMerge("w-full", className)}
    >
      {data.images.map((img, i) => (
        <SwiperSlide key={i}>
          <Image
            src={img}
            alt={data.name}
            width={1800}
            height={2600}
            className="pointer-events-none"
          />
        </SwiperSlide>
      ))}
      <button
        className="h-10 w-10 flex justify-center items-center bg-white absolute left-0 top-1/2 -translate-y-1/2 z-40"
        ref={(node) => setPrevEl(node)}
      >
        <ChevronRightIcon className="rotate-180 h-8 w-8 stroke-darkGray hover:opacity-60" />
      </button>
      <button
        className="h-10 w-10 flex justify-center items-center bg-white absolute right-0 top-1/2 -translate-y-1/2 z-40"
        ref={(node) => setNextEl(node)}
      >
        <ChevronRightIcon className="h-8 w-8 stroke-darkGray hover:opacity-60" />
      </button>
    </Swiper>
  );
};

export default Slider;
