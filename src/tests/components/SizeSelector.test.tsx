import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import SizeSelector from "@/app/_components/SizeSelector";
import { product } from "../mocks";

describe("SizeSelector", () => {
  it("sets the correct size after selection", async () => {
    const sizeGoal = "m";

    let stateMock = undefined;
    const mockSetState = jest.fn((s) => (stateMock = s));

    render(
      <SizeSelector
        product={product}
        outsideControl={[stateMock, mockSetState]}
      />
    );

    const sizeButtons = await screen.findAllByRole("button");

    const mSizeButton = sizeButtons[2];
    await userEvent.click(mSizeButton);

    expect(stateMock).toEqual(sizeGoal);
  });
});
