import * as React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface DataTableProps {
  data: Staff[];
  handleRedeemClicked: React.MouseEventHandler<HTMLButtonElement>;
}

function DataTable({ data, handleRedeemClicked }: DataTableProps) {
  const headers = ["No.", "Staff Pass ID", "Role", "Team Name", "Redeemed At", ""];

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 500 }} aria-label="custom data table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) =>
              index > 1 ? (
                <TableCell key={index} align="right">
                  {header}
                </TableCell>
              ) : (
                <TableCell key={index} component="th" scope="row">
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.staffPassId}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.staffPassId}
              </TableCell>
              <TableCell align="right">
                {row.role}
              </TableCell>
              <TableCell align="right">{row.teamName}</TableCell>
              <TableCell align="right">
                {row.redeemedAt
                  ? new Date(row.redeemedAt).toLocaleString()
                  : "Not Redeemed"}
              </TableCell>
              <TableCell align="right">
                <Button
                  value={[row.staffPassId, row.teamName]}
                  disabled={row.redeemedAt != null}
                  variant="contained"
                  onClick={handleRedeemClicked}
                >
                  Redeem
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
