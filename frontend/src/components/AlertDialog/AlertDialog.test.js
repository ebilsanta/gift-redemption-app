/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import AlertDialog from "./AlertDialog";
import "@testing-library/jest-dom";

describe("AlertDialog Component", () => {
  test("renders dialog with provided title and text", () => {
    const title = "Alert Title";
    const text = "Alert Text";
    const { getByText } = render(
      <AlertDialog open={true} handleConfirm={() => {}} handleCancel={() => {}} title={title} text={text} />
    );
    const dialogTitle = getByText(title);
    const dialogText = getByText(text);
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogText).toBeInTheDocument();
  });

  test("calls handleConfirm when Confirm button is clicked", () => {
    const handleConfirmMock = jest.fn();
    const { getByText } = render(
      <AlertDialog open={true} handleConfirm={handleConfirmMock} handleCancel={() => {}} title="Alert Title" text="Alert Text" />
    );
    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(handleConfirmMock).toHaveBeenCalled();
  });

  test("calls handleCancel when Cancel button is clicked", () => {
    const handleCancelMock = jest.fn();
    const { getByText } = render(
      <AlertDialog open={true} handleConfirm={() => {}} handleCancel={handleCancelMock} title="Alert Title" text="Alert Text" />
    );
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(handleCancelMock).toHaveBeenCalled();
  });

  test("dialog is not rendered when open prop is false", () => {
    const { queryByRole } = render(
      <AlertDialog open={false} handleConfirm={() => {}} handleCancel={() => {}} title="Alert Title" text="Alert Text" />
    );
    const dialog = queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });
});
