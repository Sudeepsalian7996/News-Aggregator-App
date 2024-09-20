import React, { useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import Header from "../../components/Header";
import NewsList from "./News/NewsList";
import Loader from "../../components/Loader";
import {
  selectSearch,
  selectDate,
  selectCategory,
  selectSource,
} from "../../features";
import { useGetAllNewsQuery } from "../../services/newsApi";
import { useGetAllGuardianNewsQuery } from "../../services/guardianApi";
import { useGetAllNewYorkTimesNewsQuery } from "../../services/newYorkTimesApi";

const HomePage = () => {
  const [newsDataState, setNewsDataState] = useState([]);
  const [guardianDataState, setGuardianDataState] = useState([]);
  const [newYorkDataState, setNewYorkDataState] = useState([]);

  //redux states
  const searchState = useSelector(selectSearch);
  const selectedDateTypeState = useSelector(selectDate);
  const categoryState = useSelector(selectCategory);
  const sourceState = useSelector(selectSource);

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

  const { data: newsData, isFetching: newsLoader } = useGetAllNewsQuery({
    searchText: searchState || "tesla",
    fromDate: handleGetFromDate(selectedDateTypeState),
  });

  const { data: guardianData, isFetching: guardianLoader } =
    useGetAllGuardianNewsQuery({
      searchText: searchState,
      fromDate: handleGetFromDate(selectedDateTypeState),
      category: categoryState,
    });

  const { data: newYorkTimesData, isFetching: nyTimesLoader } =
    useGetAllNewYorkTimesNewsQuery({
      searchText: searchState,
      fromDate: handleGetFromDate(selectedDateTypeState),
      category: categoryState,
    });

  useEffect(() => {
    console.log(">>", categoryState, !categoryState);
    if (newsData?.status === "ok") {
      if (categoryState === "" || categoryState === "all") {
        setNewsDataState(newsData?.articles);
      } else {
        setNewsDataState([]);
      }
    }
    if (newYorkTimesData?.status === "OK") {
      setNewYorkDataState(newYorkTimesData?.response?.docs);
    }
    if (guardianData?.response?.status === "ok") {
      setGuardianDataState(guardianData?.response?.results);
    }
  }, [newsData, newYorkTimesData, guardianData]);

  // useEffect(() => {
  //   console.log("categoryState>>", categoryState);
  //   // Clear newsDataState when category changes to any value except "All Category"
  //   if (categoryState !== " ") {
  //     setNewsDataState([]);
  //   }
  // }, [categoryState]);
  console.log("newsDataState>>", newsDataState);
  return (
    <>
      <Header />
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
        <Container sx={{ marginTop: "40px" }}>
          <Typography sx={{ fontSize: "32px", fontWeight: "500" }}>
            Daily Brief
          </Typography>
          <Typography sx={{ marginBottom: "25px", color: "#5f6368" }}>
            {moment().format("dddd, D MMMM")}
          </Typography>
          <NewsList
            allNews={newsDataState}
            guardianNews={guardianDataState}
            newYorkTimesNews={newYorkDataState}
          />
        </Container>
      )}
    </>
  );
};

export default HomePage;
