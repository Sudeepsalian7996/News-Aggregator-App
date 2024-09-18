import React from "react";
import { Box, Typography } from "@mui/material";

const ModalHeader = ({ title, isTitle, description, isDescription }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 16px 0px 16px",
      }}
    >
      <Box>
        {isTitle && (
          <Typography variant="h6" sx={{ fontSize: "24px", fontWeight: 500 }}>
            {title}
          </Typography>
        )}
        {isDescription && (
          <Typography
            variant="subtitle1"
            sx={{ width: { xs: "100%", sm: "75%" }, lineHeight: "24px" }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ModalHeader;
