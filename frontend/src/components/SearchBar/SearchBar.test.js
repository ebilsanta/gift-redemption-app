/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import SearchBar from "./SearchBar";
import "@testing-library/jest-dom";

describe("SearchBar Component", () => {
  const onSearchMock = jest.fn();

  test("renders TextField with correct label", () => {
    const { getByLabelText } = render(<SearchBar onSearch={onSearchMock} />);
    const searchTextField = getByLabelText("Search for staff");
    expect(searchTextField).toBeInTheDocument();
  });

  test("calls onSearch with input value when text changes", () => {
    const { getByLabelText } = render(<SearchBar onSearch={onSearchMock} />);
    const searchTextField = getByLabelText("Search for staff");
    fireEvent.change(searchTextField, { target: { value: "John" } });
    expect(onSearchMock).toHaveBeenCalledWith("John");
  });

  test("TextField value changes when user types", () => {
    const { getByLabelText } = render(<SearchBar onSearch={onSearchMock} />);
    const searchTextField = getByLabelText("Search for staff");
    fireEvent.change(searchTextField, { target: { value: "John" } });
    expect(searchTextField.value).toBe("John");
  });
});
