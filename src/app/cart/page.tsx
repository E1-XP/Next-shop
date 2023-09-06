import * as React from "react";

import prisma from "../../../prisma/client";
import { Product } from "@prisma/client";

import ProductTable from "./ProductTable";
import CartSummary from "./CartSummary";

const CartPage = async () => {
  const cartItems: Product[] =
    (await prisma.product.findMany({ orderBy: { id: "asc" } })) || [];

  const data = { heading: "Cart" };

  return (
    <div className="wrapper flex flex-col gap-[52px] py-[52px]">
      <header className="flex justify-center">
        <h2 className="heading-2 md:heading-1">{data.heading}</h2>
      </header>
      <ProductTable data={cartItems} className="content" />
      <div className="grid md:grid-cols-2 content mt-[52px] w-full">
        <div>ok</div>
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
