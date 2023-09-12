"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import { Product } from "@prisma/client";

import "swiper/css";
import ProductItem from "../components/ProductItem";

interface Props {
  data: Product[];
  heading: string;
  paragraph?: string;
  bgColor?: string;
  className?: string;
  itemClassName?: string;
}

const ScrollableSlider = ({
  className,
  itemClassName,
  data,
  heading,
  paragraph,
  bgColor,
}: Props) => {
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${window.innerWidth - document.documentElement.offsetWidth}px`
    );
  }, []);

  return (
    <section
      className={twMerge("flex flex-col gap-12 py-16", className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="wrapper flex flex-col gap-4 items-center justify-between mx-auto">
        <h2 className="heading-2">{heading}</h2>
        {paragraph && <p className="text max-w-[1000px]">{paragraph}</p>}
      </div>
      <Swiper
        slidesPerView={2.2}
        spaceBetween={16}
        mousewheel={{
          forceToAxis: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3.2,
          },
          1024: { slidesPerView: 5.2 },
          1520: { slidesPerView: 5 },
        }}
        modules={[Mousewheel]}
        className="w-full !px-[max(16px,(100vw_-_(1432px_+_var(--scrollbar-width)))_/_2)]"
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <ProductItem data={item} className={itemClassName} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ScrollableSlider;
