import prisma from "@/../prisma/client";
import { Product } from "@prisma/client";

import ProductList from "./components/ProductList";

export default async function Home() {
  const p: Product[] = (await prisma.product.findMany()) || [];
  const products = Array(8)
    .fill(null)
    .map((_, i) => p[i % 2 ? 1 : 0]);

  return (
    <main className="">
      <ProductList products={products} />
    </main>
  );
}
