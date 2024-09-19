import axios from "axios";
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const GUARDIAN_BASE_URL = import.meta.env.VITE_GUARDIAN_BASE_URL;
const NEWYORK_TIMES_API_KEY = import.meta.env.VITE_NEWYORK_TIMES_API_KEY;
const NEWYORK_TIMES_BASE_URL = import.meta.env.VITE_NEWYORK_TIMES_BASE_URL;

//Api for fetch data from news api
const getAllNews = (query) => {
  return axios.get(
    `${NEWS_BASE_URL}everything?q=tesla&pageSize=10&apiKey=${NEWS_API_KEY}`
  );
};

//Api for fetch data from gaurdian news api
const getAllGuardianNews = (query) => {
  return axios.get(`${GUARDIAN_BASE_URL}search?api-key=${GUARDIAN_API_KEY}`);
};

//Api for fetch data from newyork times news api
const getAllNewYorkTimesNews = (query) => {
  return axios.get(
    `${NEWYORK_TIMES_BASE_URL}?q=election&api-key=${NEWYORK_TIMES_API_KEY}`
  );
};

export default { getAllNews, getAllGuardianNews, getAllNewYorkTimesNews };
