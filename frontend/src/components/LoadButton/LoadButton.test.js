/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import LoadButton from "./LoadButton";
import "@testing-library/jest-dom";

describe("LoadButton Component", () => {
  const handleLoadMock = jest.fn();

  test("renders button with correct label when hasMoreData is true", () => {
    const { getByText } = render(
      <LoadButton handleLoad={handleLoadMock} hasMoreData={true} />
    );
    const loadButton = getByText("Load more");
    expect(loadButton).toBeInTheDocument();
  });

  test("renders button with correct label when hasMoreData is false", () => {
    const { getByText } = render(
      <LoadButton handleLoad={handleLoadMock} hasMoreData={false} />
    );
    const loadButton = getByText("No more results");
    expect(loadButton).toBeInTheDocument();
  });

  test("calls handleLoad when button is clicked and hasMoreData is true", () => {
    const { getByText } = render(
      <LoadButton handleLoad={handleLoadMock} hasMoreData={true} />
    );
    const loadButton = getByText("Load more");
    fireEvent.click(loadButton);
    expect(handleLoadMock).toHaveBeenCalled();
  });

  test("button is disabled when hasMoreData is false", () => {
    const { getByText } = render(
      <LoadButton handleLoad={handleLoadMock} hasMoreData={false} />
    );
    const loadButton = getByText("No more results");
    expect(loadButton).toBeDisabled();
  });

  test("button is not disabled when hasMoreData is true", () => {
    const { getByText } = render(
      <LoadButton handleLoad={handleLoadMock} hasMoreData={true} />
    );
    const loadButton = getByText("Load more");
    expect(loadButton).not.toBeDisabled();
  });
});
