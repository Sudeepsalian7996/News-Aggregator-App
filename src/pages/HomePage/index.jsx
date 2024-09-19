import React, { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import moment from "moment";
import Header from "../../components/Header";
import NewsList from "./News/NewsList";
import Services from "../../services/newsApiService";

const HomePage = () => {
  const [newsData, setNewsData] = useState({
    allNews: [],
    guardianNews: [],
    newYorkTimesNews: [],
  });

  useEffect(() => {
    fetchAllNews();
  }, []);

  const fetchAllNews = async () => {
    try {
      //Api call using promise
      const results = await Promise.allSettled([
        Services.getAllNews(),
        Services.getAllGuardianNews(),
        Services.getAllNewYorkTimesNews(),
      ]);

      //Handle the results
      const allNews =
        results[0].status === "fulfilled"
          ? results[0]?.value?.data?.articles
          : [];
      const guardianNews =
        results[1].status === "fulfilled"
          ? results[1]?.value?.data?.response?.results
          : [];
      const newYorkTimesNews =
        results[2].status === "fulfilled"
          ? results[2]?.value?.data?.response?.docs
          : [];

      setNewsData({
        allNews,
        guardianNews,
        newYorkTimesNews,
      });
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };
  console.log("newsData>>", newsData);
  return (
    <>
      <Header />
      <Container sx={{ marginTop: "40px" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "500" }}>
          Daily Brief
        </Typography>
        <Typography sx={{ marginBottom: "25px", color: "#5f6368" }}>
          {moment().format("dddd, D MMMM")}
        </Typography>
        <NewsList newsData={newsData} />
      </Container>
    </>
  );
};

export default HomePage;
