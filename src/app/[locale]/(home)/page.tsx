import prisma from "@/../prisma/client";

import HeroSection from "./Hero";
import ProductList from "@/app/_components/ProductList";
import NewsletterSection from "./Newsletter";
import InstagramSection from "./Instagram";
import { NewArrivalsSlider, SummerCollectionSlider } from "./Sliders";

export default async function Home() {
  const products =
    (await prisma.product.findMany({ orderBy: { id: "asc" } })) || [];

  return (
    <main className="">
      <HeroSection />
      <NewArrivalsSlider products={products.concat(products)} />
      <SummerCollectionSlider
        products={products.concat([...products, ...products])}
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
