"use client";

import * as React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import swiper from "swiper";

import Button from "../components/Button";

import { useWindowSize } from "@/app/hooks/useWindowSize";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from "@/../public/pexels-nicolas-postiglioni-1080118.webp";
import slide2 from "@/../public/pexels-david-fagundes-1894263.webp";
import slide3 from "@/../public/wesley-tingey-3mGnYRUNIck-unsplash.jpg";
import ArrowRightIcon from "../components/icons/ArrowRight";

const HeroSection = () => {
  const data = {
    heading: "Featured",
    slides: [
      {
        img: slide1,
        imgColor: "#9ba398",
        heading: "It's time for a bold statement!",
        paragraph:
          "Make a statement this summer with our bold and vibrant new collection for women - perfect for turning heads and standing out in style.",
      },
      {
        img: slide2,
        imgColor: "#6b8d95",
        heading: "Sizzle in Style: Hot Summer Women's Fashion",
        paragraph:
          "Make a statement this summer with our bold and vibrant new collection for women - perfect for turning heads and standing out in style.",
      },
      {
        img: slide3,
        imgColor: "#d02e6e",
        heading: "Sizzle in Style: Hot Summer Women's Fashion",
        paragraph:
          "Make a statement this summer with our bold and vibrant new collection for women - perfect for turning heads and standing out in style.",
      },
    ],
  };

  const [slideIdx, setSlideIdx] = React.useState(0);

  const onSlideChange = (instance: swiper) => setSlideIdx(instance.realIndex);

  const { width } = useWindowSize();
  const BP_SM = 640;
  const isMobile = width < BP_SM;

  return (
    <section
      className="sm:h-[77vh] -mt-[72px] pt-[72px] transition-colors delay-200"
      style={{
        background: `linear-gradient(289deg, transparent 20%, rgba(33, 33, 33, 0.95) 100%), ${data.slides[slideIdx].imgColor}`,
      }}
    >
      <h2 className="sr-only">{data.heading}</h2>
      <Swiper
        slidesPerView={1}
        autoplay={{ delay: 7000 }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        id="hero-slider"
        className="h-full bg-darkGray wrapper transition-colors delay-200"
        style={{
          backgroundColor: isMobile
            ? data.slides[slideIdx].imgColor
            : undefined,
        }}
        onSlideChange={onSlideChange}
      >
        {data.slides.map((item, i) => (
          <SwiperSlide key={item.heading}>
            <div className="relative flex flex-col h-full">
              <Image
                src={item.img}
                alt="Product campaign photo"
                className={`pointer-events-none w-full h-full object-cover object-center md:object-[0%_48%] mask-image max-sm:!basis-1/2 ${
                  i === 2 ? "max-sm:object-center max-md:object-left" : ""
                }`}
              />
              <div className="max-sm:wrapper max-sm:h-[305px] max-[400px]:h-[360px] max-sm:mb-10 max-sm:justify-center sm:absolute top-[50%] sm:top-[10%] md:top-[12%] inset-4 sm:left-10 lg:left-14 sm:w-[400px] lg:w-[545px] flex flex-col items-start gap-4">
                <p className="heading-3 sm:heading-2 lg:heading-1 uppercase !text-white">
                  {item.heading}
                </p>
                <p className="text text-white">{item.paragraph}</p>
                <Button
                  alt={true}
                  className="flex items-center gap-2 group mt-3"
                >
                  See collection
                  <ArrowRightIcon className="transition group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
