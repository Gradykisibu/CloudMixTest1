import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import Utilities from "../../utilities";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import { Triangle } from "react-loader-spinner";
import CustomAudioPlayer from "../CustomAudio/CustomAudioPlayer";
import { useFeedContext } from "../context/FeedContext/FeedContext";
import EmojiePoppover from "../common/EmojieModal/EmojiePoppover";

function Home() {
  const [getUsers, setGetUsers] = useState([]);
  const { getAllUsersFromFirestore } = Utilities();
  const [loader, setLoader] = useState(false);
  const { setFeeds, feeds, markDataAsFetched, isDataFetched } =
    useFeedContext();
    const [inputText, setInputText] = useState("");

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const fetchAllUsersFeeds = async () => {
      setLoader(true);

      if (!isDataFetched) {
        const db = getFirestore();
        const usersCollection = collection(db, "feeds");

        try {
          const usersSnapshot = await getDocs(usersCollection);
          const fetchedFeeds = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const shuffledFeeds = shuffleArray(fetchedFeeds);

          setFeeds(shuffledFeeds);
          markDataAsFetched();
        } catch (error) {
          console.error("Error fetching feeds:", error);
        } finally {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const allUsers = await getAllUsersFromFirestore();
        setGetUsers(allUsers);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
    fetchAllUsersFeeds();
  }, [isDataFetched, setFeeds, markDataAsFetched, getAllUsersFromFirestore]);

  const handleSubmit = () => {
    console.log(inputText)
    setInputText("")
  }

  return (
    <Box className={styles.homeMainContainer}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: { xs: "block", sm: "block", md: "none", lg: "none" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            mb: "30px",
          }}
        >
          <img
            src="https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...CCrhNMmBfFwXs1M3EMoAJtlyAthvFv...foz"
            alt="logo"
            width={150}
            height={100}
          />
          <p style={{ mt: "10px" }}>
            cannot display on this device, switch to desktop size
          </p>
        </Box>
      </Box>

      <Box
        sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
      >
        {loader && (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Triangle
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Box>
        )}
        {!loader && (
          <>
            {feeds.map((item) => {
              const matchingUser = getUsers.find((user) =>
                user.userFeed?.includes(item.id)
              );
              const timestamp = item?.timestamp?.toDate();
              const formattedDate = timestamp?.toLocaleDateString();

              return (
                <Box
                  key={item.id}
                  sx={{
                    marginTop: "20px",
                    // mr: {sm: "0px", md:"50px",},
                    borderBottom: "1px solid #1e1e1e",
                    paddingBottom: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      mb: "10px",
                      ml: { xs: "10px", md: "0px" },
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        alt="Remy Sharp"
                        src={matchingUser?.image || ""}
                        width={200}
                        height={200}
                      />
                    </Stack>
                    <p
                      style={{
                        marginLeft: "10px",
                        fontWeight: "bold",
                        color: "white",
                        fontSize: "14px",
                      }}
                    >
                      @{matchingUser?.initial || "Unknown User"} .{" "}
                      <span style={{ fontSize: "9px", color: "#777777" }}>
                        {formattedDate}
                      </span>{" "}
                    </p>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.image && (
                      <img
                        src={item?.image}
                        alt="feed"
                        width={450}
                        height={400}
                        style={{
                          width: "80%",
                          maxWidth: "450px",
                          height: "auto",
                          borderRadius: "15px",
                        }}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.audio && (
                      <CustomAudioPlayer
                        src={item.audio}
                        songname={item.songname}
                      />
                    )}
                  </Box>

                  <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
                    {item.text && (
                      <p>
                        {" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "white",
                            fontSize: "11px",
                          }}
                        >
                          {matchingUser?.initial}
                        </span>{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#777777",
                            width: "450px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                            marginTop: "10px",
                          }}
                        >
                          {item.text}
                        </span>
                      </p>
                    )}
                  </Box>

                  <Box sx={{ mt: "5px" }}>
                    <FavoriteBorderOutlinedIcon
                      fontSize="medium"
                      sx={{ color: "white", cursor: "pointer" }}
                    />
                    <ChatBubbleOutlineOutlinedIcon
                      fontSize="medium"
                      sx={{
                        marginLeft: "5px",
                        color: "white",
                        cursor: "pointer",
                      }}
                    />
                  </Box>

                  <Box sx={{ color: "white", fontSize: "10px" }}>
                    <p>0 Likes</p>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "grey",
                        height: "30px",
                        fontSize: "15px",
                        borderRadius: "5px",
                        width: "400px",
                      }}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    <EmojiePoppover  inputText={inputText} setInputText={setInputText}/>
                    <SendIcon sx={{ color: "white", cursor: "pointer" }}  onClick={handleSubmit}/>
                  </Box>
                </Box>
              );
            })}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Home;
