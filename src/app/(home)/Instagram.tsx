import Image from "next/image";
import Link from "next/link";
import * as React from "react";

function importAll(r: any) {
  const images = {};
  r.keys().forEach((item: any) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context(
    "@/../public/images/instagram",
    false,
    /\.(png|jpe?g|svg|webp)$/
  )
);

const InstagramSection = () => {
  const data = {
    preHeading: "#nextshop",
    heading: "On Instagram",
  };

  return (
    <section className="mt-[52px] text-center">
      <Link href="#" className="text font-semibold">
        {data.preHeading}
      </Link>
      <h2 className="heading-2 mt-2">{data.heading}</h2>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Object.entries(images)
          .filter(([name]) => !name.startsWith("public/images/"))
          .map(([name, img], i) => (
            <Image
              key={i}
              src={img.default}
              alt="Instagram photo from Next-shop account presenting new fashion"
              className="object-cover object-center aspect-square"
            />
          ))}
      </div>
    </section>
  );
};

export default InstagramSection;
