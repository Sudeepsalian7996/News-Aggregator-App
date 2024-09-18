import React from "react";
import { Box } from "@mui/material";
import Button from "../Button";

const ModalFooter = ({ handleReset, handleCancel, handleSaveAndClose }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: "20px", sm: 0 },
        justifyContent: "space-between",
        padding: 2,
        flexShrink: 0,
        overflow: "hidden",
        width: "90%",
      }}
    >
      <Button
        handleClick={handleReset}
        variant="outlined"
        hasText={true}
        label="Reset topics"
      />

      <Box
        sx={{
          display: "flex",
          gap: "8px",
          justifyContent: { xs: "center", sm: "right" },
        }}
      >
        <Button
          handleClick={handleCancel}
          variant="outlined"
          hasText={true}
          label="Cancel"
        />
        <Button
          handleClick={handleSaveAndClose}
          variant="contained"
          hasText={true}
          label="Save and Close"
        />
      </Box>
    </Box>
  );
};

export default ModalFooter;
