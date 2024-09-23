import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCategory, setDate, setSource } from "../../features";

// Reusable Dropdown component
const Dropdown = ({
  label,
  options,
  setNewsPage,
  setGaurdianPage,
  setNewyorkNewsPage,
  setIsDrawerOpen,
}) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
    setIsDrawerOpen(false);
    if (label === "Category") {
      dispatch(setCategory([event.target.value]));
      setGaurdianPage(1);
      setNewyorkNewsPage(1);
    } else if (label === "Source") {
      dispatch(setSource([event.target.value]));
      setNewsPage(1);
      setNewyorkNewsPage(1);
    } else if (label === "Date") {
      dispatch(setDate(event.target.value));
      setNewsPage(1);
      setGaurdianPage(1);
    }
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
          <MenuItem
            key={index}
            value={option.value === "" ? "all" : option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
