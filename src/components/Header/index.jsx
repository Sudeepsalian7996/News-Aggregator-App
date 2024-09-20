import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../Searchbar";
import Dropdown from "../Dropdown";
import CustomiseIcon from "../../assets/Icons/CustomiseIcon";
import PersonalizedPopup from "../../pages/HomePage/PersonalizedPopup";

// Main Header component
const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Dropdown options for category, source, and date
  const categories = [
    { label: "All Category", value: "" },
    { label: "Technology", value: "technology" },
    { label: "Business", value: "business" },
    { label: "Politics", value: "politics" },
    { label: "Sports", value: "sport" },
    { label: "World", value: "world" },
  ];

  const sources = [
    { label: "All source", value: "" },
    { label: "BBC News", value: "bbc-news" },
    { label: "CNN", value: "cnn" },
    { label: "The Guardian", value: "the-guardian-uk" },
    { label: "The New York Times", value: "the-new-york-times" },
  ];

  const dates = [
    { label: "Lifetime", value: "lifetime" },
    { label: "Last 24 hours", value: "last_24_hours" },
    { label: "Last 7 days", value: "last_7_days" },
    { label: "Last 30 days", value: "last_30_days" },
    { label: "Last 90 days", value: "last_90_days" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#fff", color: "#000", minHeight: "75px" }}
      >
        <Toolbar sx={{ marginTop: "6px", gap: { lg: "25px" } }}>
          {/* Hamburger and Website Name for mobile */}
          <Box
            sx={{
              margin: 0,
              width: "100%",
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpen(true)} // Open drawer
              sx={{ display: isSearchOpen ? "none" : "flex" }}
            >
              <MenuIcon />
            </IconButton>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: isSearchOpen ? "none" : "flex",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  ml: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  fontSize: "1.25rem",
                }}
              >
                InnoReport
              </Typography>
            </Link>

            {/* Search Icon for mobile */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="search"
              sx={{
                display: { xs: isSearchOpen ? "none" : "flex", md: "none" },
              }}
              onClick={() => setIsSearchOpen(true)} // Open search field
            >
              <SearchIcon />
            </IconButton>
            {isSearchOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Box sx={{ flexGrow: 1, mx: 2 }}>
                  <SearchBar
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                  />
                </Box>
              </Box>
            )}
            <Box sx={{ ml: 2 }}>
              <Button
                variant="contained"
                sx={{
                  color: "#0b57d0",
                  backgroundColor: "#fff",
                  textTransform: "none",
                  boxShadow: "none",
                  position: "absolute",
                  right: 0,
                  top: 15,
                  "&:hover": {
                    boxShadow: "none",
                    opacity: "0.8",
                  },
                }}
                onClick={() => setShowPopup(!showPopup)}
              >
                <CustomiseIcon />
                {window.screen.width > 600 && <span> Customise</span>}
              </Button>
            </Box>
          </Box>

          {/* Website Name for desktop */}
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: "1.75rem",
                cursor: "pointer",
              }}
            >
              InnoReport
            </Typography>
          </Link>

          {/* Search Bar for desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            <SearchBar />
          </Box>

          {/* Customize Button for desktop */}
          {window.screen.width > 900 && (
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Button
                variant="contained"
                sx={{
                  ml: 2,
                  color: "#0b57d0",
                  backgroundColor: "#fff",
                  textTransform: "none",
                  boxShadow: "none",
                  border: "1px solid",

                  "&:hover": {
                    boxShadow: "none",
                    opacity: "0.8",
                  },
                }}
                onClick={() => setShowPopup(!showPopup)}
              >
                {window.screen.width > 900 && window.screen.width < 1100 ? (
                  <CustomiseIcon />
                ) : (
                  <>
                    <CustomiseIcon />
                    <span> Customise</span>
                  </>
                )}
              </Button>
            </Box>
          )}

          {/* Dropdowns for Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}>
            <Dropdown label="Category" options={categories} />
            <Dropdown label="Source" options={sources} />
            <Dropdown label="Date" options={dates} />
          </Box>
        </Toolbar>

        {/* Drawer for Mobile */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          PaperProps={{
            sx: { width: "80%" },
          }}
        >
          <Box sx={{ padding: 2 }}>
            {/* Website Name inside Drawer */}
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h6" noWrap>
                InnoReport
              </Typography>
            </Link>
            {/* Dropdowns inside Drawer */}
            <Box
              sx={{
                mt: 5,
                marginLeft: "-10px",
                display: "flex",
                flexDirection: "column",
                gap: "25px",
              }}
            >
              <Dropdown label="Category" options={categories} />
              <Dropdown label="Source" options={sources} />
              <Dropdown label="Date" options={dates} />
            </Box>
          </Box>
        </Drawer>
      </AppBar>
      <PersonalizedPopup showPopup={showPopup} setShowPopup={setShowPopup} />
    </>
  );
};

export default Header;
