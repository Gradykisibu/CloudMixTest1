import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";

function Home() {
  const [ feeds, setFeeds ] = useState([])
  const [loader, setLoader ] = useState(false);



  const fetchAllUsers = async () => {
    setLoader(true)
    const db = getFirestore();
    const usersCollection = collection(db, "feeds");
    try {
      const usersSnapshot = await getDocs(usersCollection);

      const feeds = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFeeds(feeds);
      setLoader(false)
    } catch (error) {
      console.error("Error fetching all users:", error);
      setLoader(false)
    }
    setLoader(false)
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);


  console.log(loader)
  console.log(feeds)

  return (
  <Box className={styles.homeMainContainer}>
    {feeds.map((item) => {
      return(
        <div key={item.id}>
          <img src={item?.image} alt="feed" width={200} height={200}/>
        </div>
      )
    })}
  </Box>
  );
}

export default Home;
