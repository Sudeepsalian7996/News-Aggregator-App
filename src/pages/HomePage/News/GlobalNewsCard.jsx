// UsNewsCard.jsx

import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";
import moment from "moment";
import newsThumbImg from "../../../assets/Images/newsThumbImg.jpg";

const UsNewsCard = ({
  title,
  source,
  publishedAt,
  webUrl,
  imageUrl,
  description,
}) => {
  const handleCardClick = () => {
    window.open(webUrl, "_blank"); // Opens the URL in a new tab
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        height: 450,
        overflow: "hidden",
        boxShadow: 3,
        position: "relative",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.02)",
          transition: "transform 0.2s ease-in-out",
          cursor: "pointer",
          textDecoration: "underline",
        },
      }}
      onClick={handleCardClick}
    >
      {/* Header Image */}
      <CardMedia
        component="img"
        height="200"
        image={imageUrl ? imageUrl : newsThumbImg}
        alt="News Image"
      />
      <CardContent
        sx={{
          flex: "1 0 auto",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* News Section Chip */}
        <Chip
          label={source}
          color="primary"
          size="small"
          sx={{ position: "absolute", top: 16, left: 16 }}
        />
        {/* News Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            my: 1,
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 4, // Limit to 2 lines
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>
        {/* Publication Date */}
        <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
          {moment(publishedAt).format("DD MMMM YYYY")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UsNewsCard;
