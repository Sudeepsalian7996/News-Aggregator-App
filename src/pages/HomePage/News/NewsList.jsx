import React from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import GlobalNewsCard from "./GlobalNewsCard";
import PastNewsCard from "./PastNewsCard";
import NewYorkNewsCard from "./NewYorkNewsCard";
import Button from "../../../components/Button";
import { selectCategory, selectSource, selectDate } from "../../../features";

const NewsList = ({
  globalNews,
  guardianNews,
  newYorkTimesNews,
  setNewsPage,
  newsPageLoader,
  setNewsPageLoader,
  setNewyorkNewsPage,
  newyorkPageLoader,
  setNewyorkNewsPageLoader,
  setGaurdianPage,
  gaurdianPageLoader,
  setGaurdianPageLoader,
}) => {
  //redux states
  const categorySelector = useSelector(selectCategory);
  const sourceSelector = useSelector(selectSource);
  const dateState = useSelector(selectDate);
  const categoryState = categorySelector.join(",");
  const sourceState = sourceSelector.join(",");

  //News section show more button handler
  const handleNewsDataShowMore = () => {
    setNewsPageLoader(true);
    setNewsPage((prevPage) => prevPage + 1); // Increment the page number
  };

  //Newyork news section show more button handler
  const handleNewyorkNewsDataShowMore = () => {
    setNewyorkNewsPageLoader(true);
    setNewyorkNewsPage((prevPage) => prevPage + 1); // Increment the page number
  };

  //gaurdian news section show more button handler
  const handleGuardianNewsDataShowMore = () => {
    setGaurdianPageLoader(true);
    setGaurdianPage((prevPage) => prevPage + 1); // Increment the page number
  };
  return (
    <Grid container spacing={3} sx={{ gap: "50px", margin: 0 }}>
      {globalNews?.length > 0 &&
        (categoryState === "all" || categoryState === "") &&
        sourceState !== "new-york-times" && (
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
              {newsPageLoader ? (
                <CircularProgress /> // Loader when fetching more data
              ) : (
                <Button
                  color="primary"
                  label=" Show More"
                  handleClick={handleNewsDataShowMore}
                  disabled={newsPageLoader} // Disable button when fetching
                />
              )}
            </Box>
          </Box>
        )}
      {newYorkTimesNews?.length > 0 &&
        !(sourceState === "cnn" || sourceState === "bbc-news") &&
        (dateState === "" || dateState === "lifetime") && (
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
            {/* Show More Button */}

            <Box textAlign="center" mt={4}>
              {newyorkPageLoader ? (
                <CircularProgress /> // Loader when fetching more data
              ) : (
                <Button
                  color="primary"
                  label=" Show More"
                  handleClick={handleNewyorkNewsDataShowMore}
                  disabled={newyorkPageLoader} // Disable button when fetching
                />
              )}
            </Box>
          </Box>
        )}
      {guardianNews?.length > 0 &&
        (sourceState === "" || sourceState === "all") && (
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
            {/* Show More Button */}

            <Box textAlign="center" mt={4}>
              {gaurdianPageLoader ? (
                <CircularProgress /> // Loader when fetching more data
              ) : (
                <Button
                  color="primary"
                  label=" Show More"
                  handleClick={handleGuardianNewsDataShowMore}
                  disabled={gaurdianPageLoader} // Disable button when fetching
                />
              )}
            </Box>
          </Box>
        )}
    </Grid>
  );
};

export default NewsList;
