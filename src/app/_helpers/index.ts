import { currencies, locales } from "./constants";

export const formatPrice = (
  num: number,
  currency: (typeof currencies)[number],
  locale: (typeof locales)[number]
) => {
  const currLocale = locale === "en" ? "en-US" : "pl";

  return (num / 100).toLocaleString(currLocale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: "currency",
    currency: currency.toUpperCase(),
  });
};

export const getProductsPrice = (
  products: { price: number; quantity: number }[]
) => products.reduce((acc, item) => acc + item.price * item.quantity, 0);
