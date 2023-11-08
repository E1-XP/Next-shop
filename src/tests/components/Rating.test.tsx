import { render, screen } from "@testing-library/react";
import * as React from "react";

import Rating from "@/app/_components/Rating";

describe("Rating", () => {
  it("should show appriopriate count of stars filled with color", () => {
    const rate = 4;

    const { container } = render(<Rating rate={rate} />);

    /* eslint-disable */
    const filledStars = container.getElementsByClassName("fill-orange");

    expect(filledStars.length).toEqual(4);
  });
});
