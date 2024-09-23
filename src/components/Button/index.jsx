import React from "react";
import { Button } from "@mui/material";

const customButton = ({
  variant = "outlined",
  handleClick,
  hasText = true,
  label = "Button",
  disabled = false,
}) => {
  return (
    <Button
      onClick={handleClick}
      variant={variant}
      sx={{ textTransform: "none" }}
      disabled={disabled}
    >
      {hasText && label}
    </Button>
  );
};

export default customButton;
