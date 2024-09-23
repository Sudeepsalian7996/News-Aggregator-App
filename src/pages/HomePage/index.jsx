import React, { useEffect, useState } from "react";
import { Typography, Container, Box, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Header from "../../components/Header";
import NewsList from "./News/NewsList";
import Loader from "../../components/Loader";
import {
  selectSearch,
  selectDate,
  selectCategory,
  selectSource,
  selectAuthor,
  clearFilters,
} from "../../features";
import { useGetAllNewsQuery } from "../../services/newsApi";
import { useGetAllGuardianNewsQuery } from "../../services/guardianApi";
import { useGetAllNewYorkTimesNewsQuery } from "../../services/newYorkTimesApi";
import NoDataFound from "../../components/NoDataFound";

const HomePage = () => {
  const [newsDataState, setNewsDataState] = useState([]);
  const [guardianDataState, setGuardianDataState] = useState([]);
  const [newYorkDataState, setNewYorkDataState] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [newsPage, setNewsPage] = useState(1);
  const [newsPageLoader, setNewsPageLoader] = useState(false);
  const [newyorkNewsPage, setNewyorkNewsPage] = useState(1);
  const [newyorkPageLoader, setNewyorkNewsPageLoader] = useState(false);
  const [gaurdianPage, setGaurdianPage] = useState(1);
  const [gaurdianPageLoader, setGaurdianPageLoader] = useState(false);

  const dispatch = useDispatch();
  //redux states
  const searchState = useSelector(selectSearch);
  const selectedDateTypeState = useSelector(selectDate);
  const categorySelector = useSelector(selectCategory);
  const sourceSelector = useSelector(selectSource);
  const authorSelector = useSelector(selectAuthor);

  const categoryState = categorySelector.join(",");
  const sourceState = sourceSelector.join(",");

  //Define limit for pagination
  const newsPageLimit = 6;
  const guardianPageLimit = 8;

  //Convert the date into required formate
  const handleGetFromDate = (selectedDateType) => {
    switch (selectedDateType) {
      case "last_24_hours":
        return moment().subtract(24, "hours").format("YYYY-MM-DD");
      case "last_7_days":
        return moment().subtract(7, "days").format("YYYY-MM-DD");
      case "last_30_days":
        return moment().subtract(30, "days").format("YYYY-MM-DD");
      case "last_90_days":
        return moment().subtract(90, "days").format("YYYY-MM-DD");
      case "lifetime":
        return "";
      default:
        return ""; // Earliest date for lifetime or any other default date
    }
  };

  const { data: newsData, isFetching: newsLoader } = useGetAllNewsQuery(
    {
      page: newsPage,
      limit: newsPageLimit,
      searchText: searchState || "world",
      fromDate: handleGetFromDate(selectedDateTypeState),
      source: sourceState,
    },
    {
      skip: sourceState === "new-york-times",
    }
  );

  const { data: guardianData, isFetching: guardianLoader } =
    useGetAllGuardianNewsQuery({
      // Parameters for the query
      page: gaurdianPage,
      limit: guardianPageLimit,
      searchText: searchState || "world", // Use `searchState` or default to "world"
      fromDate: handleGetFromDate(selectedDateTypeState), // Filter by selected date type
      category: categoryState === "all" ? "" : categoryState, // Filter category if not "all"
    });

  const { data: newYorkTimesData, isFetching: nyTimesLoader } =
    useGetAllNewYorkTimesNewsQuery(
      {
        page: newyorkNewsPage, // Handles pagination
        searchText: searchState, // Use searchState or default to "world"
        fromDate: handleGetFromDate(selectedDateTypeState), // Filter based on the selected date type
        category: categoryState === "all" ? "" : categoryState, // Filter category if not "all"
        source: sourceState, // Use sourceState for source filter
      },
      {
        // Skip query if the source is not "new-york-times"
        skip: sourceState === "cnn" || sourceState === "bbc-news",
      }
    );

  useEffect(() => {
    handleFetchAllNews();
  }, [newsData, newYorkTimesData, guardianData]);

  const handleFetchAllNews = () => {
    // Check for general news data
    if (newsData?.status === "ok") {
      setNewsPageLoader(false);
      //Since we dont have currentPage in this api we are using newsPage state
      if (newsPage === 1) {
        setNewsDataState(newsData?.articles);
      } else {
        setNewsDataState((prev) => {
          // Filter out duplicates based on unique property
          const uniqueArticles = newsData?.articles?.filter(
            (article) => !prev.some((item) => item.url === article.url)
          );
          return [...prev, ...uniqueArticles];
        });
      }
    } else {
      setNewsPageLoader(false);
    }

    if (newYorkTimesData?.status === "OK") {
      //Since we dont have currentPage in this api we are using the offset
      setNewyorkNewsPageLoader(false);
      if (newYorkTimesData?.response?.meta?.offset === 10) {
        setNewYorkDataState(newYorkTimesData?.response?.docs);
      } else {
        setNewYorkDataState((prev) => {
          // Filter out duplicates based on unique property (e.g., title, url)
          const uniqueArticles = newYorkTimesData?.response?.docs?.filter(
            (article) => !prev.some((item) => item.web_url === article.web_url)
          );
          return [...prev, ...uniqueArticles];
        });
      }
    } else {
      setNewyorkNewsPageLoader(false);
    }

    if (guardianData?.response?.status === "ok") {
      setGaurdianPageLoader(false);
      //Using current page to set the data
      if (guardianData?.response?.currentPage === 1) {
        setGuardianDataState(guardianData?.response?.results);
      } else {
        setGuardianDataState((prev) => {
          // Filter out duplicates based on unique property (e.g., title, url)
          const uniqueArticles = guardianData?.response?.results?.filter(
            (article) => !prev.some((item) => item.webUrl === article.webUrl)
          );
          return [...prev, ...uniqueArticles];
        });
      }
    } else {
      setGaurdianPageLoader(false);
    }

    //Filter author data from news api since we don't have a params in the api
    if (authorSelector.length > 0) {
      const filteredAuthor = newsData?.articles?.filter((item) =>
        authorSelector.includes(item.author)
      );
      setAuthorData(filteredAuthor);
    }
  };

  //Handle clear all filters
  const handleClearAllFilter = () => {
    dispatch(clearFilters());
  };

  return (
    <>
      <Header
        setNewsPage={setNewsPage}
        setGaurdianPage={setGaurdianPage}
        setNewyorkNewsPage={setNewyorkNewsPage}
      />
      {(newsLoader || guardianLoader || nyTimesLoader) &&
      !(newsPageLoader || newyorkPageLoader || gaurdianPageLoader) ? (
        <Box
          width="100%"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Loader />
        </Box>
      ) : (
        <Container sx={{ marginTop: "28px", marginBottom: "75px" }}>
          <Typography sx={{ fontSize: "32px", fontWeight: "500" }}>
            Daily Brief
          </Typography>
          <Typography sx={{ marginBottom: "25px", color: "#5f6368" }}>
            {moment().format("dddd, D MMMM")}
          </Typography>
          {newsDataState.length > 0 ||
          guardianDataState.length > 0 ||
          newYorkDataState.length > 0 ||
          authorData.length > 0 ? (
            <NewsList
              globalNews={newsDataState}
              guardianNews={guardianDataState}
              newYorkTimesNews={newYorkDataState}
              authorData={authorData}
              setNewsPage={setNewsPage}
              newsPageLoader={newsPageLoader}
              setNewsPageLoader={setNewsPageLoader}
              setNewyorkNewsPage={setNewyorkNewsPage}
              newyorkPageLoader={newyorkPageLoader}
              setNewyorkNewsPageLoader={setNewyorkNewsPageLoader}
              setGaurdianPage={setGaurdianPage}
              gaurdianPageLoader={gaurdianPageLoader}
              setGaurdianPageLoader={setGaurdianPageLoader}
            />
          ) : (
            <NoDataFound
              hasIcon={true}
              hasInfo={true}
              hasTitle={true}
              title="Oops! No results this time"
              hasSubTitle={true}
              subTitle="Please adjust your searching filters and give it another go!"
              isClear={true}
              label="Clear filters"
              onClick={handleClearAllFilter}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default HomePage;
