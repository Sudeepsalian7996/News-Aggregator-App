import React from "react";
import IconSearchNoResults from "../../assets/Icons/IconSearchNoResults";
import Button from "../Button";
import { Box, Typography } from "@mui/material";

const NoDataFound = ({
  onClick,
  title = "",
  subTitle = "",
  icon = <IconSearchNoResults />,
  label = "Clear all filters",
  isClear = true,
  hasIcon = true,
  hasTitle = true,
  hasSubTitle = true,
  hasInfo = true,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        maxWidth: 648,
        margin: "auto",
        gap: 3,
      }}
    >
      {hasIcon && (
        <Box sx={{ height: 120, width: "100%", textAlign: "center" }}>
          {icon}
        </Box>
      )}
      {hasInfo && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            width: "100%",
          }}
        >
          {hasTitle && (
            <Typography
              variant="h6"
              sx={{ color: "text.primary", textAlign: "center" }}
            >
              {title}
            </Typography>
          )}
          {hasSubTitle && (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              {subTitle}
            </Typography>
          )}
        </Box>
      )}
      {isClear && (
        <Button
          variant="contained"
          hasText={true}
          label={label}
          handleClick={onClick}
          sx={{ marginTop: 2 }}
        >
          {label}
        </Button>
      )}
    </Box>
  );
};

export default NoDataFound;
