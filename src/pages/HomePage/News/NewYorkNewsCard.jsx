import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import moment from "moment";
import newsThumbImg from "../../../assets/Images/newsThumbImg.jpg";

const NewYorkNewsCard = ({ imageUrl, source, publishedAt, title, webUrl }) => {
  const handleCardClick = () => {
    window.open(webUrl, "_blank"); // Opens the URL in a new tab
  };

  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: 600,
        "&:hover": { cursor: "pointer", textDecoration: "underline" },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        sx={{ width: "25%", objectFit: "cover" }}
        image={`https://static01.nyt.com/${imageUrl ? imageUrl : newsThumbImg}`}
        alt="News image"
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "75%" }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {source}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2, // Limit to 2 lines
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(publishedAt).format("DD MMMM YYYY")}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default NewYorkNewsCard;
