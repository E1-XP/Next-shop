import { CartItem } from "../_store/cart";

export const formatPrice = (num: number) =>
  num.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });

export const getProductsPrice = (products: CartItem[]) =>
  products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
