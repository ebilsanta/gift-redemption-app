/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import DataTable from "./DataTable";
import "@testing-library/jest-dom";

describe("DataTable Component", () => {
  const data = [
    { staffPassId: 1, teamName: "Team A", redeemedAt: null },
    { staffPassId: 2, teamName: "Team B", redeemedAt: new Date().toISOString() }
  ];

  const handleRedeemClickedMock = jest.fn();

  test("renders table with correct data", () => {
    const { getAllByRole, getByText } = render(
      <DataTable data={data} handleRedeemClicked={handleRedeemClickedMock} />
    );
    const table = getByText("No.");
    expect(table).toBeInTheDocument();

    const tableRows = getAllByRole("row").slice(1); 
    expect(tableRows).toHaveLength(data.length);

    data.forEach((rowData, index) => {
      expect(tableRows[index]).toHaveTextContent(`${index + 1}`);
      expect(tableRows[index]).toHaveTextContent(`${rowData.staffPassId}`);
      expect(tableRows[index]).toHaveTextContent(`${rowData.teamName}`);
      if (rowData.redeemedAt) {
        expect(tableRows[index]).toHaveTextContent(new Date(rowData.redeemedAt).toLocaleString());
      } else {
        expect(tableRows[index]).toHaveTextContent("Not Redeemed");
      }
    });
  });

  test("calls handleRedeemClicked when Redeem button is clicked", () => {
    const { getAllByText } = render(
      <DataTable data={data} handleRedeemClicked={handleRedeemClickedMock} />
    );
    const redeemButtons = getAllByText("Redeem");
    fireEvent.click(redeemButtons[0]);
    expect(handleRedeemClickedMock).toHaveBeenCalledWith(expect.any(Object));
  });

  test("Redeem button is disabled for redeemed data", () => {
    const { getAllByText } = render(
      <DataTable data={data} handleRedeemClicked={handleRedeemClickedMock} />
    );
    const redeemButtons = getAllByText("Redeem");
    expect(redeemButtons[1]).toBeDisabled();
  });
});
