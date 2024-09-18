import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";

const ModalPopup = ({
  isOpen = false,
  children,
  isTitle,
  title,
  isDescription,
  description,
  modelSize = "md",
  handleCancel,
  handleSaveAndClose,
  handleReset,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      maxWidth={modelSize}
      PaperProps={{
        sx: {
          background: "#fff",
          borderRadius: "12px",
          maxHeight: "720px",
          margin: { xs: 0, sm: "32px" },
        },
      }}
    >
      {/* Modal Header with Close Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          position: "relative",
        }}
      >
        <ModalHeader
          isTitle={isTitle}
          title={title}
          isDescription={isDescription}
          description={description}
        />
        <IconButton
          onClick={handleCancel}
          sx={{ zIndex: 10, position: "absolute", right: "19px", top: "12px" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Modal Content */}
      <DialogContent>{children}</DialogContent>

      {/* Modal Footer */}
      <DialogActions sx={{ padding: 2, justifyContent: "space-between" }}>
        <ModalFooter
          handleCancel={handleCancel}
          handleSaveAndClose={handleSaveAndClose}
          handleReset={handleReset}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ModalPopup;
