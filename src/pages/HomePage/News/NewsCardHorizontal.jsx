import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import moment from "moment";

const NewsCardHorizontal = ({
  id,
  title,
  publishedAt,
  source,
  webUrl,
  type,
}) => {
  return (
    <Card key={id} sx={{ display: "flex", mb: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
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
          <Typography variant="body2">{type || "liveblog"}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {webUrl}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default NewsCardHorizontal;
