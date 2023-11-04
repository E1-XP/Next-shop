"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import { Product, Review } from "@prisma/client";
import ProductItem from "./ProductItem";
import { useGlobalStore } from "@/app/_store/global";
import { trpc } from "@/app/_trpc/client";
import { useHydrate } from "@/app/_hooks/useHydrate";

import "swiper/css";

interface Props {
  products: Product[];
  heading: string;
  paragraph?: string;
  bgColor?: string;
  className?: string;
  itemClassName?: string;
}

const ScrollableSlider = ({
  className,
  itemClassName,
  products,
  heading,
  paragraph,
  bgColor,
}: Props) => {
  const { currency } = useGlobalStore();
  useHydrate();

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${window.innerWidth - document.documentElement.offsetWidth}px`
    );
  }, []);

  const isUSD = currency === "usd";

  const prices =
    trpc.payment.getPrices.useQuery({
      stripeId: products.map((p) => p.stripeId),
    }).data ?? [];

  const productsWithPrices = products.map((product) => {
    const price = prices.find(
      (price) =>
        price.id === (isUSD ? product?.priceUSDId : product?.pricePLNId)
    );

    const oldPrice = prices.find(
      (price) =>
        price.id === (isUSD ? product?.oldPriceUSDId : product?.oldPricePLNId)
    );

    return {
      price: price?.unit_amount!,
      oldPrice: oldPrice?.unit_amount!,
    };
  });

  return (
    <section
      className={twMerge("flex flex-col gap-12 py-16", className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="wrapper flex flex-col gap-4 items-center justify-between mx-auto">
        <h2 className="heading-3 md:heading-2">{heading}</h2>
        {paragraph && <p className="paragraph max-w-[1000px]">{paragraph}</p>}
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
        {products.map((item, i) => (
          <SwiperSlide key={i}>
            <ProductItem
              product={item}
              productPrices={productsWithPrices[i]}
              className={itemClassName}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ScrollableSlider;
