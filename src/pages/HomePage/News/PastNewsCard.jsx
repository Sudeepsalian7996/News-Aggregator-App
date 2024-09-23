import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import moment from "moment";
import { ArrowForward } from "@mui/icons-material";

const PastNewsCard = ({ title, sectionName, publishedAt, webUrl }) => {
  return (
    <Card
      sx={{
        margin: 2,
        padding: 3,
        height: { md: 150 },
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#ffffff",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
          cursor: "pointer",
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1a1a1a",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            {sectionName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(publishedAt).format("DD MMMM YYYY")}
          </Typography>
        </Box>
        {/* Footer with Read More Button */}
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "center", sm: "flex-end" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            size="small"
            endIcon={<ArrowForward />}
            sx={{
              borderRadius: 50,
              textTransform: "none",
            }}
            onClick={() => window.open(webUrl, "_blank")}
          >
            Read More
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PastNewsCard;
