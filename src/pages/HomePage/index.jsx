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

  const dispatch = useDispatch();
  //redux states
  const searchState = useSelector(selectSearch);
  const selectedDateTypeState = useSelector(selectDate);
  const categorySelector = useSelector(selectCategory);
  const sourceSelector = useSelector(selectSource);
  const authorSelector = useSelector(selectAuthor);

  const categoryState = categorySelector.join(",");
  const sourceState = sourceSelector.join(",");

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
      searchText: searchState || "world",
      fromDate: handleGetFromDate(selectedDateTypeState),
      source: sourceState,
    },
    {
      skip: sourceState === "new-york-times",
      selectFromResult: ({ data, isFetching, currentData }) => {
        // Use a ref to track initial load and differentiate page changes from filter changes
        const shouldFetch =
          !currentData || // First load when there is no data
          searchState !== "" || // Search text has changed
          sourceState !== "" || // Source filter has changed
          selectedDateTypeState !== ""; // Date type filter has changed

        return {
          data,
          newsLoader: shouldFetch && isFetching, // Only show loader when shouldFetch is true
        };
      },
    }
  );

  const { data: guardianData, isFetching: guardianLoader } =
    useGetAllGuardianNewsQuery({
      searchText: searchState,
      fromDate: handleGetFromDate(selectedDateTypeState),
      category: categoryState === "all" ? "" : categoryState,
    });

  const { data: newYorkTimesData, isFetching: nyTimesLoader } =
    useGetAllNewYorkTimesNewsQuery(
      {
        searchText: searchState,
        fromDate: handleGetFromDate(selectedDateTypeState),
        category: categoryState === "all" ? "" : categoryState,
        source: sourceState,
      },
      { skip: sourceState === "cnn" || sourceState === "bbc-news" }
    );

  useEffect(() => {
    // Check for general news data
    if (newsData?.status === "ok") {
      // If no category is selected or "all" category is selected, set data
      if (categoryState === "" || categoryState === "all") {
        setNewsDataState([...newsDataState, ...newsData?.articles]);
      } else {
        setNewsDataState([]); // Set to empty if category is not "all"
      }
    } else if (!newsData && sourceState !== "new-york-times") {
      setNewsDataState([]); // Set to empty if API call is skipped
    }

    // Check for New York Times data
    if (sourceState === "cnn" || sourceState === "bbc-news") {
      setNewYorkDataState([]); // Set to empty if API call is skipped
    } else if (newYorkTimesData?.status === "OK") {
      setNewYorkDataState(newYorkTimesData?.response?.docs);
    }

    // Check for Guardian data
    if (
      sourceState === "new-york-times" ||
      sourceState === "cnn" ||
      sourceState === "bbc-news"
    ) {
      setGuardianDataState([]); // Set to empty if API call is skipped
    } else if (guardianData?.response?.status === "ok") {
      setGuardianDataState(guardianData?.response?.results);
    }

    //Filter author data from news api since we don't have a params in the api
    if (authorSelector.length > 0) {
      const filteredAuthor = newsData?.articles?.filter((item) =>
        authorSelector.includes(item.author)
      );
      setAuthorData(filteredAuthor);
    }
  }, [
    newsData,
    newYorkTimesData,
    guardianData,
    categoryState,
    sourceState,
    authorSelector,
  ]);

  //Handle clear all filters
  const handleClearAllFilter = () => {
    dispatch(clearFilters());
  };

  return (
    <>
      <Header setNewsPage={setNewsPage} />
      {newsLoader || guardianLoader || nyTimesLoader ? (
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
        <Container sx={{ marginTop: "28px" }}>
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
              newsLoader={newsLoader}
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
