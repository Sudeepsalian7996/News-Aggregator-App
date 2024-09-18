import React from "react";
import { Button } from "@mui/material";

const customButton = ({
  variant = "outlined",
  handleClick,
  hasText = true,
  label = "Button",
}) => {
  return (
    <Button
      onClick={handleClick}
      variant={variant}
      sx={{ textTransform: "none" }}
    >
      {hasText && label}
    </Button>
  );
};

export default customButton;
