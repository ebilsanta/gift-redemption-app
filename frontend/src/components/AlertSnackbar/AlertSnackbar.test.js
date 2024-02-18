/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import AlertSnackbar from "./AlertSnackbar";
import "@testing-library/jest-dom";

describe("AlertSnackbar Component", () => {
  test("renders Snackbar with provided message and severity", () => {
    const message = "Snackbar Message";
    const severity = "error";
    const setOpenMock = jest.fn();
    const { getByText } = render(
      <AlertSnackbar open={true} setOpen={setOpenMock} message={message} severity="error" />
    );
    const snackbarMessage = getByText(message);
    expect(snackbarMessage).toBeInTheDocument();
  });
});
