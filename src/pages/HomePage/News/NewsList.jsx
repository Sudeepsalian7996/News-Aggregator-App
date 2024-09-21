import React from "react";
import { Grid } from "@mui/material";
import NewsCardFullWidthImage from "./NewsCardFullWidthImage";
import NewsCardHorizontal from "./NewsCardHorizontal";
import NewsCardWithImageOrAvatar from "./NewsCardWithImageOrAvatar";

const NewsList = ({ allNews, guardianNews, newYorkTimesNews, authorData }) => {
  // Combine all news into a single array with an identifier for the source
  const combinedNews = [
    ...allNews.map((news) => ({ ...news, source: "allNews" })),
    ...newYorkTimesNews.map((news) => ({ ...news, source: "newYorkTimes" })),
    ...guardianNews.map((news) => ({ ...news, source: "guardianNews" })),
    ...authorData,
  ];

  return (
    <Grid container spacing={3}>
      {/* Map over the combined news data */}
      {combinedNews.map((news, index) => (
        <Grid item xs={12} md={4} key={news.id || index}>
          {news.source === "allNews" && news.author !== "[Removed]" && (
            <NewsCardWithImageOrAvatar
              author={news.author}
              urlToImage={news.urlToImage}
              title={news.title}
              source={news.source.name}
              publishedAt={news.publishedAt}
              description={news.description}
              index={index}
            />
          )}
          {news.source === "newYorkTimes" && news.multimedia && (
            <NewsCardFullWidthImage
              imageUrl={news?.multimedia[1]?.url}
              title={news.headline.main}
              source={news.source}
              publishedAt={news.pub_date}
              description={news.lead_paragraph}
              id={news.id}
              type={news.document_type}
            />
          )}
          {news.source === "guardianNews" && (
            <NewsCardHorizontal
              type={news.type}
              title={news.webTitle}
              source={news.sectionName}
              publishedAt={news.webPublicationDate}
              webUrl={news.webUrl}
              id={news.id}
            />
          )}
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
          <Grid container spacing={2}>
            {allNews.map((news, index) => (
              <Grid item xs={12} sm={8} md={4} key={index}>
                <WorldNewsCard
                  author={news.author}
                  imageUrl={news.urlToImage}
                  title={news.title}
                  source={news.source.name}
                  publishedAt={news.publishedAt}
                  description={news.description}
                  webUrl={news.url}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsList;
