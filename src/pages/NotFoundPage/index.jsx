import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <ErrorOutlineIcon
        sx={{ fontSize: "100px", color: "error.main", marginBottom: 2 }}
      />
      <Typography
        variant="h1"
        color="error"
        sx={{ fontSize: "5rem", fontWeight: "bold" }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2, fontStyle: "italic" }}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3, color: "#555" }}>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ padding: "10px 20px", borderRadius: "8px" }}
        component={Link}
        to="/home"
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
