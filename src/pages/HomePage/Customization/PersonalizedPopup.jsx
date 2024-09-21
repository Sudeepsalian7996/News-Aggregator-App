import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Chip, Typography, Divider } from "@mui/material";
import Icon from "@mui/material/Icon";
import ModalPopup from "../../../components/ModalPopup";
import { categories, sources, authors } from "../../../data/filterData";
import {
  setCategory,
  setAuthor,
  setSource,
  setCount,
  selectCategory,
  selectAuthor,
  selectSource,
} from "../../../features";

const PersonalizedPopup = ({ showPopup, setShowPopup }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const dispatch = useDispatch();

  //Redux selectors
  const categoryState = useSelector(selectCategory);
  const sourceState = useSelector(selectSource);
  const authorState = useSelector(selectAuthor);

  const handleSelect = (item, type) => {
    if (type === "category") {
      setSelectedCategories((prev) =>
        prev.includes(item.value)
          ? prev.filter((i) => i !== item.value)
          : [...prev, item.value]
      );
    } else if (type === "author") {
      setSelectedAuthors((prev) =>
        prev.includes(item.value)
          ? prev.filter((i) => i !== item.value)
          : [...prev, item.value]
      );
    } else if (type === "source") {
      setSelectedSources((prev) =>
        prev.includes(item.value)
          ? prev.filter((i) => i !== item.value)
          : [...prev, item.value]
      );
    }
  };

  //Handle close popup
  const handleCancel = () => {
    setShowPopup(false);
    if (categoryState.length === 0) {
      setSelectedCategories([]);
    }
    if (authorState.length === 0) {
      setSelectedAuthors([]);
    }
    if (sourceState.length === 0) {
      setSelectedSources([]);
    }
  };

  //Handle save and close popup
  const handleSaveAndClose = () => {
    //Count how many filters are selected from the popup
    const count =
      (selectedCategories.length > 0 ? 1 : 0) +
      (selectedAuthors.length > 0 ? 1 : 0) +
      (selectedSources.length > 0 ? 1 : 0);
    dispatch(setCount(count));
    dispatch(setCategory(selectedCategories));
    dispatch(setSource(selectedSources));
    dispatch(setAuthor(selectedAuthors));
    setShowPopup(false);
  };

  //Handle reset the popup
  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedAuthors([]);
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
          {categories
            .filter((cat) => cat.value !== "")
            .map((category) => (
              <Chip
                key={category.value}
                label={category.label}
                onClick={() => handleSelect(category, "category")}
                onDelete={() => handleSelect(category, "category")}
                color={
                  selectedCategories.includes(category.value)
                    ? "primary"
                    : "default"
                }
                deleteIcon={
                  selectedCategories.includes(category.value) ? "" : <Icon />
                }
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
          {sources
            .filter((source) => source.value !== "")
            .map((source) => (
              <Chip
                key={source.value}
                label={source.label}
                onClick={() => handleSelect(source, "source")}
                onDelete={() => handleSelect(source, "source")}
                color={
                  selectedSources.includes(source.value) ? "primary" : "default"
                }
                deleteIcon={
                  selectedSources.includes(source.value) ? "" : <Icon />
                }
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
              key={author.value}
              label={author.label}
              onClick={() => handleSelect(author, "author")}
              onDelete={() => handleSelect(author, "author")}
              color={
                selectedAuthors.includes(author.value) ? "primary" : "default"
              }
              deleteIcon={
                selectedAuthors.includes(author.value) ? "" : <Icon />
              }
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>
      </Box>
    </ModalPopup>
  );
};

export default PersonalizedPopup;
