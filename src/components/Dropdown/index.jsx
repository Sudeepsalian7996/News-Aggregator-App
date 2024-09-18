import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// Reusable Dropdown component
const Dropdown = ({ label, options }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120, mx: 1, width: { xs: "100%" } }}>
      <InputLabel sx={{ marginTop: "-8px" }}>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={label}
        sx={{ padding: 0, height: 38 }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
