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

export const calculateRating = (reviews: { rating: number }[]) => {
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.floor(sum / reviews.length);
};
