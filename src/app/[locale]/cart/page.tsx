import * as React from "react";

import CartDetails from "./CartDetails";
import { serverClient } from "@/app/_trpc/serverClient";
import CartHeader from "./CartHeader";

const CartPage = async () => {
  const products = await serverClient.product.getAll({ order: "asc" });

  return (
    <div className="flex flex-col gap-[52px] py-[52px]">
      <CartHeader />
      <CartDetails products={products.concat(products, ...products)} />
    </div>
  );
};

export default CartPage;
