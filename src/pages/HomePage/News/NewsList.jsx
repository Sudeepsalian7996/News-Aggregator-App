import React from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import GlobalNewsCard from "./GlobalNewsCard";
import PastNewsCard from "./PastNewsCard";
import NewYorkNewsCard from "./NewYorkNewsCard";

const NewsList = ({
  globalNews,
  guardianNews,
  newYorkTimesNews,
  authorData,
  setNewsPage,
  newsLoader,
}) => {
  // Combine all news into a single array with an identifier for the source
  // const combinedNews = [
  //   ...globalNews.map((news) => ({ ...news, source: "globalNews" })),
  //   ...newYorkTimesNews.map((news) => ({ ...news, source: "newYorkTimes" })),
  //   ...guardianNews.map((news) => ({ ...news, source: "guardianNews" })),
  //   ...authorData,
  // ];

  const handleNewsSDataShowMore = () => {
    setNewsPage((prevPage) => prevPage + 1); // Increment the page number
  };

  return (
    <Grid container spacing={3} sx={{ gap: "50px", margin: 0 }}>
      {globalNews?.length > 0 && (
        <Box>
          <Typography
            sx={{
              marginBottom: "25px",
              color: "#1867DC",
              fontSize: "32px",
            }}
          >
            Global news
          </Typography>
          {/* Map over globalNews */}
          <Grid container spacing={2}>
            {globalNews.map((news, index) => (
              <Grid item xs={12} sm={8} md={4} key={index}>
                {news.author !== "[Removed]" && (
                  <GlobalNewsCard
                    author={news?.author}
                    imageUrl={news?.urlToImage}
                    title={news?.title}
                    source={news?.source?.name}
                    publishedAt={news?.publishedAt}
                    description={news?.description}
                    webUrl={news?.url}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          {/* Show More Button */}
          <Box textAlign="center" mt={4}>
            {newsLoader ? (
              <CircularProgress /> // Loader when fetching more data
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNewsSDataShowMore}
                disabled={newsLoader} // Disable button when fetching
              >
                Show More
              </Button>
            )}
          </Box>
        </Box>
      )}
      {newYorkTimesNews?.length > 0 && (
        <Box>
          <Typography
            sx={{
              marginBottom: "25px",
              color: "#1867DC",
              fontSize: "32px",
            }}
          >
            Newyork times news
          </Typography>
          {/* Map over newYorkTimesNews */}
          <Grid container spacing={2}>
            {newYorkTimesNews?.map((news, index) => (
              <Grid item xs={12} sm={8} md={6} key={index}>
                <NewYorkNewsCard
                  imageUrl={news?.multimedia[10]?.url}
                  title={news?.headline?.main}
                  source={news?.source}
                  publishedAt={news?.pub_date}
                  webUrl={news?.web_url}
                  id={news?.id}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {guardianNews?.length > 0 && (
        <Box>
          <Typography
            sx={{
              marginBottom: "15px",
              color: "#1867DC",
              fontSize: "32px",
            }}
          >
            Past news
          </Typography>
          {/* Map over guardianNews */}
          <Grid container spacing={2}>
            {guardianNews.map((news, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <PastNewsCard
                  title={news.webTitle}
                  sectionName={news.sectionName}
                  publishedAt={news.webPublicationDate}
                  webUrl={news.webUrl}
                  id={news.id}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default NewsList;
