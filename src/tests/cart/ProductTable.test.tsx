import { render, screen } from "@testing-library/react";
import * as React from "react";

import ProductTable from "@/app/[locale]/cart/ProductTable";
import { RootMock, product, product2 } from "../mocks";

import { useCartStore } from "@/app/_store/cart";
import { sizeKeys } from "@/app/_components/SizeSelector";

describe("ProductTable", () => {
  it("shows correct number of product rows after rendering", async () => {
    const products = [
      { quantity: 1, size: "m" as sizeKeys, product },
      { quantity: 1, size: "m" as sizeKeys, product: product2 },
    ];

    useCartStore.setState({ products });

    render(<ProductTable />, { wrapper: RootMock });

    const productRows = screen.getAllByRole("img");

    expect(productRows.length).toEqual(2);
  });
});
