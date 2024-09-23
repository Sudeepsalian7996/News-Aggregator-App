
# News Aggregator

## Project Overview
This project is a news aggregator application that allows users to search and filter news articles from various sources. Users can personalize their news feed by selecting preferred sources and categories. The application is built using React with Vite for fast development and build processes. It is optimized for both desktop and mobile devices, ensuring a seamless user experience across different screen sizes.

## Features
* #### Article Search & Filtering
  * Search articles by keyword.
  * Filter results by date, category, and source.
* #### Personalized News Feed
  * Customize your news feed based on preferred sources and categories.
* #### Mobile-Responsive Design
  * Optimized for viewing on both mobile and desktop devices.
* #### Data Sources
  *Integrated with multiple APIs including:
NewsAPI,
The Guardian API,
New York Times API

## Installation
#### Prerequisites
  * Node.js (>=14.0.0)
  * Docker (for containerization)

#### Setup
1. #### Clone the Repository:
   * [https://github.com/Sudeepsalian7996/News-Aggregator-App](https://github.com/Sudeepsalian7996/News-Aggregator-App)
   * cd News-Aggregator-App

2. #### Install Dependencies:
   * npm install
  
3. #### Environment Variables:
   * VITE_NEWS_API_KEY = your_key
   * VITE_GUARDIAN_API_KEY = your_key
   * VITE_NEWYORK_TIMES_API_KEY = your_key
   * VITE_NEWS_BASE_URL = base_url
   * VITE_GUARDIAN_BASE_URL =  base_url
   * VITE_NEWYORK_TIMES_BASE_URL = base_url
  
4. #### Run the Application:
    * npm run dev
    * The application should now be running at http://localhost:5173

## Docker Setup

1. #### Build the Docker Image:
   * docker build -t news-aggregator-app .
  
2. #### Run the Docker Container:
   * docker run -p 5173:5173 news-aggregator-app

3. #### Access the Application:
   * Open your browser and go to http://localhost:5173
  
## Usage
1. #### Search Articles:
   * Use the search bar at the top to enter keywords and find relevant articles.
  
2. #### Filter Articles:
   * Use the filters on the sidebar to refine articles by date, category, and source.

3. #### Customise Feed:
   * Click on the customise button to select preferred sources, categories.
  
4. #### Mobile View:
   * Open the application on a mobile device or use a responsive tool in the browser to view the mobile layout.
  
## Future Improvements
1. #### Enhanced Personalization:
   * Add more options for users to customise their news feed.
  
2. #### Dark Mode Toggle:
   * Implement a toggle for dark mode to improve usability and accessibility for users who prefer a darker interface, especially in low-light environments.
  
3. #### Advanced Search Functionality
   * Implement search suggestions with recent search history to enhance user experience and facilitate quick access to previously viewed topics.

  



