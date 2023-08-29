import prisma from "@/../prisma/client";
import { Product } from "@prisma/client";

import ProductList from "./components/ProductList";

export default async function Home() {
  const p: Product[] =
    (await prisma.product.findMany({ orderBy: { id: "asc" } })) || [];
  const products = [...p, ...p, ...p, ...p];

  return (
    <main className="">
      <ProductList products={products} />
    </main>
  );
}
