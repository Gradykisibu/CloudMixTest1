import React, { createContext, useContext, useState } from "react";

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [feeds, setFeeds] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const markDataAsFetched = () => {
    setIsDataFetched(true);
  };

  const payload = {
    feeds,
    setFeeds,
    isDataFetched,
    markDataAsFetched,
  };

  return (
    <FeedContext.Provider value={payload}>{children}</FeedContext.Provider>
  );
};

export const useFeedContext = () => {
  return useContext(FeedContext);
};
