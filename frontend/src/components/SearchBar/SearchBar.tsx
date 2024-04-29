import React from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <TextField
      label="Search for staff by id or role"
      variant="outlined"
      onChange={handleSearchChange}
      fullWidth
      margin="normal"
    />
  );
}

export default SearchBar;
