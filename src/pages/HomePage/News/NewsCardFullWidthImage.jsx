import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import moment from "moment";

const NewsCardFullWidthImage = ({
  type,
  imageUrl,
  title,
  source,
  publishedAt,
  description,
  id,
}) => {
  return (
    <Card key={id} sx={{ mb: 3 }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={`https://static01.nyt.com/${imageUrl}`}
          alt={title}
        />
      )}
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {source} • {moment(publishedAt).format("DD MMMM YYYY")}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
          }}
        >
          {description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {type || "multimedia"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsCardFullWidthImage;
