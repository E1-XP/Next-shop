import prisma from "@/../prisma/client";
import { Product } from "@prisma/client";

import HeroSection from "./Hero";
import ProductList from "../components/ProductList";

export default async function Home() {
  const products =
    (await prisma.product.findMany({ orderBy: { id: "asc" } })) || [];

  return (
    <main className="">
      <HeroSection />
      <ProductList products={products} />
    </main>
  );
}
