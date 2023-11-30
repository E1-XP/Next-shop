import { calculateRating, formatPrice, getProductsPrice } from "@/app/_helpers";

describe("formatPrice", () => {
  it("returns correct value for usd/en", () => {
    const expected = "$99.00";
    const received = formatPrice(9900, "usd", "en");

    expect(received).toEqual(expected);
  });

  it("returns correct value for pln/pl", () => {
    const expected = "99,00\xa0zł";
    const received = formatPrice(9900, "pln", "pl");

    expect(received).toEqual(expected);
  });
});

describe("getProductsPrice", () => {
  it("returns correct sum of product prices", () => {
    const testData = [
      { price: 8000, quantity: 2 },
      { price: 4000, quantity: 1 },
    ];

    const expected = 20000;
    const received = getProductsPrice(testData);

    expect(received).toEqual(expected);
  });
});

describe("calculateRating", () => {
  it("calculates correct sum of product reviews", () => {
    const testData = [{ rating: 1 }, { rating: 5 }];

    const expected = 3;
    const received = calculateRating(testData);

    expect(received).toEqual(expected);
  });
});
