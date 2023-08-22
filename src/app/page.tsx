import prisma from "./../../prisma/client";
import { Product } from "@prisma/client";

export default async function Home() {
  const products = (await prisma.product.findMany()) || [];
  const item = (products.length && products[0].name) || "nothing found";

  return <main className="">{item}</main>;
}
