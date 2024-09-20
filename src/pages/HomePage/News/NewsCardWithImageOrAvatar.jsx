import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
} from "@mui/material";
import moment from "moment";

const NewsCardWithImageOrAvatar = ({
  author,
  urlToImage,
  title,
  source,
  publishedAt,
  description,
  index,
}) => {
  return (
    <Card key={index} sx={{ mb: 3 }}>
      {index % 2 === 0 && urlToImage ? (
        <>
          <CardMedia
            component="img"
            height="180"
            image={urlToImage}
            alt={title}
          />
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
          </CardContent>
        </>
      ) : (
        <>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ mr: 2 }}>{author ? author[0] : "A"}</Avatar>
            <Box>
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
              <Typography variant="body2">{author || "Anonymous"}</Typography>
            </Box>
          </CardContent>
          <CardContent>
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 5,
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default NewsCardWithImageOrAvatar;
