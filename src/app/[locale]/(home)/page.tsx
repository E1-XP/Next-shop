import HeroSection from "./Hero";
import ProductList from "@/app/_components/ProductList";
import NewsletterSection from "./Newsletter";
import InstagramSection from "./Instagram";
import { NewArrivalsSlider, SummerCollectionSlider } from "./Sliders";
import DiscountBanner from "./DiscountBanner";

import { serverClient } from "@/app/_trpc/serverClient";

export default async function Home() {
  const products = await serverClient.product.getAll({ order: "asc" });

  return (
    <main className="">
      <HeroSection />
      <NewArrivalsSlider products={products.concat(products)} />
      <SummerCollectionSlider
        products={products.concat([...products, ...products])}
      />
      <DiscountBanner />
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
