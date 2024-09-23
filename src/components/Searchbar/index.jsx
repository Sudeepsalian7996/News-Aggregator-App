import React from "react";
import { useDispatch } from "react-redux";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setSearch } from "../../features";

// Search Bar component
const SearchBar = ({
  isSearchOpen,
  setIsSearchOpen,
  setNewsPage,
  setGaurdianPage,
  setNewyorkNewsPage,
}) => {
  const dispatch = useDispatch();

  //Handle search
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      dispatch(setSearch(event.target.value));
      setNewsPage(1);
      setGaurdianPage(1);
      setNewyorkNewsPage(1);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexGrow: isSearchOpen ? "" : 1,
        mx: isSearchOpen ? 0 : 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: isSearchOpen ? 0 : "18px",
          transform: "translateY(-50%)",
          color: "grey",
          zIndex: 1,
        }}
      >
        {isSearchOpen ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ marginLeft: "5px" }}
            onClick={() => setIsSearchOpen(false)} // Close search field
          >
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <SearchIcon />
        )}
      </Box>
      <InputBase
        placeholder="Enter keyword"
        sx={{
          color: "inherit",
          pl: 4,
          width: isSearchOpen ? "80%" : "100%",
          padding: isSearchOpen ? "4px 4px 4px 40px" : "10px 10px 10px 50px",
          fontSize: "16px",
          borderRadius: "50px",
          border: "1px solid #e9e7e7",
          transition: "background-color 0.3s, border-color 0.3s", // Smooth transition for hover and focus
          "&:hover": {
            borderColor: "grey",
          },
          "&.Mui-focused": {
            backgroundColor: "transparent",
            borderColor: "#0b57d0",
          },
        }}
        inputProps={{ "aria-label": "search" }}
        onKeyDown={handleSearch}
      />
    </Box>
  );
};

export default SearchBar;
