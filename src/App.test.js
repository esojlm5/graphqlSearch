import React from "react";
import { render } from "@testing-library/react";
import ListResults from "./ListResults";

test("render ListResult", () => {
  const { container, getByText } = render(<ListResults />);

  expect(container.firstChild).toMatchSnapshot();
});
