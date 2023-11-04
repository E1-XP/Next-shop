import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useTranslations } from "next-intl";

import img from "@/../public/images/instagram/david-lezcano-NfZiOJzZgcg-unsplash.webp";
import img2 from "@/../public/images/instagram/evangeline-sarney-NnsqpLjiA94-unsplash.webp";
import img3 from "@/../public/images/instagram/jernej-graj-fpVak87yOG0-unsplash.webp";
import img4 from "@/../public/images/instagram/keagan-henman-xPJYL0l5Ii8-unsplash.webp";
import img5 from "@/../public/images/instagram/kristina-petrick-liJ5irOt8BM-unsplash.webp";
import img6 from "@/../public/images/instagram/marco-xu-x2tnHqvWYB0-unsplash.webp";

const InstagramSection = () => {
  const t = useTranslations("Home.Instagram");

  const data = {
    preHeading: t("preHeading"),
    heading: t("heading"),
    images: [img, img2, img3, img4, img5, img6],
  };

  return (
    <section className="my-[52px] text-center wrapper">
      <Link href="#" className="paragraph font-semibold transition hover:opacity-70">
        {data.preHeading}
      </Link>
      <h2 className="heading-2 mt-2">{data.heading}</h2>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {data.images.map((img, i) => (
          <Link href="#" key={i} className="group">
            <Image
              src={img}
              alt="Instagram photo from Next-shop account presenting new fashion"
              className="object-cover object-center aspect-square pointer-events-none group-hover:opacity-90 transition"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;
