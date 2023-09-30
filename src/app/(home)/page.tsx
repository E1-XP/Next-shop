import prisma from "@/../prisma/client";

import HeroSection from "./Hero";
import ProductList from "../_components/ProductList";
import ScrollableSlider from "./ScrollableSlider";
import NewsletterSection from "./Newsletter";
import InstagramSection from "./Instagram";

export default async function Home() {
  const products =
    (await prisma.product.findMany({ orderBy: { id: "asc" } })) || [];

  return (
    <main className="">
      <HeroSection />
      <ScrollableSlider
        data={products.concat(products)}
        heading="New arrivals"
      />
      <ScrollableSlider
        data={products.concat(products)}
        heading="New summer collection"
        bgColor="#FFC107"
        paragraph="
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde eaque perspiciatis nemo ipsum ut, velit optio placeat. Natus maiores nostrum quae dolorem eius voluptate perferendis quod totam veniam voluptatum?"
      />
      <ProductList
        products={products
          .concat(...products, ...products)
          .filter((_, i) => i < 10)}
      />
      <NewsletterSection />
      <InstagramSection />
    </main>
  );
}
