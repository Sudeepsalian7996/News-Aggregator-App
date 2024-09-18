import React, { useState } from "react";
import { Box, Chip, Typography, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Icon from "@mui/material/Icon";
import ModalPopup from "../../components/ModalPopup";

const PersonalizedPopup = ({ showPopup, setShowPopup }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);

  const categories = ["Technology", "Health", "Science"];
  const authors = ["John Doe", "Jane Smith", "Emily Johnson"];
  const sources = ["NY Times", "BBC", "CNN"];

  const handleSelect = (item, type) => {
    if (type === "category") {
      setSelectedCategories((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    } else if (type === "author") {
      setSelectedAuthors((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    } else if (type === "source") {
      setSelectedSources((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    }
  };

  //Handle close popup
  const handleCancel = () => {
    setShowPopup(false);
  };

  //Handle save and close popup
  const handleSaveAndClose = () => {
    setShowPopup(false);
  };

  //Handle reset the popup
  const handleReset = () => {
    setSelectedAuthors([]);
    setSelectedCategories([]);
    setSelectedSources([]);
  };

  return (
    <ModalPopup
      isOpen={showPopup}
      handleCancel={handleCancel}
      handleSaveAndClose={handleSaveAndClose}
      handleReset={handleReset}
      isTitle={true}
      title="Customize Your Topics"
      isDescription={true}
      description="Customize your homepage by selecting criteria to ensure the displayed topics match your interests."
    >
      <Box sx={{ padding: "0px 16px 16px 16px" }}>
        {/* Category Section */}
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} marginBottom={2}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => handleSelect(category, "category")}
              onDelete={() => handleSelect(category, "category")}
              color={
                selectedCategories.includes(category) ? "primary" : "default"
              }
              deleteIcon={selectedCategories.includes(category) ? "" : <Icon />}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Sources Section */}
        <Typography variant="h6" gutterBottom>
          Sources
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} marginBottom={2}>
          {sources.map((source) => (
            <Chip
              key={source}
              label={source}
              onClick={() => handleSelect(source, "source")}
              onDelete={() => handleSelect(source, "source")}
              color={selectedSources.includes(source) ? "primary" : "default"}
              deleteIcon={selectedSources.includes(source) ? "" : <Icon />}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Author Section */}
        <Typography variant="h6" gutterBottom>
          Authors
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {authors.map((author) => (
            <Chip
              key={author}
              label={author}
              onClick={() => handleSelect(author, "author")}
              onDelete={() => handleSelect(author, "author")}
              color={selectedAuthors.includes(author) ? "primary" : "default"}
              deleteIcon={selectedAuthors.includes(author) ? "" : <Icon />}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>
      </Box>
    </ModalPopup>
  );
};

export default PersonalizedPopup;
