export const formatPrice = (num: number) =>
  num.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });
