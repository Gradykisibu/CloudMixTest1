import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import Utilities from "../../utilities";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import ReactAudioPlayer from "react-audio-player";

function Home() {
  const [feeds, setFeeds] = useState([]);
  const [loader, setLoader] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const { user } = useAuthContext();
  const { getAllUsersFromFirestore } = Utilities();

  console.log(user);

  const fetchAllUsersFeeds = async () => {
    setLoader(true);
    const db = getFirestore();
    const usersCollection = collection(db, "feeds");
    try {
      const usersSnapshot = await getDocs(usersCollection);

      const feeds = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFeeds(feeds);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching all users:", error);
      setLoader(false);
    }
    setLoader(false);
  };

  const fetchAllUsers = async () => {
    try {
      const allUsers = await getAllUsersFromFirestore();
      setGetUsers(allUsers);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllUsersFeeds();
  }, []);

  console.log(loader);
  console.log(feeds);
  console.log(getUsers);

  return (
    <Box className={styles.homeMainContainer}>
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
              mr: "50px",
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

            <Box>
              {item.image && (
                <img
                  src={item?.image}
                  alt="feed"
                  width={450}
                  height={400}
                  style={{ borderRadius: "15px" }}
                />
              )}
            </Box>

            <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
              {item.audio && (
                <ReactAudioPlayer
                  src={item?.audio}
                  controls
                  controlsList="nodownload"
                />
              )}
            </Box>

            <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
              {item.text && (
                <p> <span style={{fontWeight:"bold", color:"white", fontSize:"11px"}}>{matchingUser?.initial}</span> <span style={{fontSize:"12px", color:"#777777"}}>{item.text}</span></p>
              )}
            </Box>

            <Box sx={{ mt: "5px" }}>
              <FavoriteBorderOutlinedIcon
                fontSize="medium"
                sx={{ color: "white", cursor: "pointer" }}
              />
              <ChatBubbleOutlineOutlinedIcon
                fontSize="medium"
                sx={{ marginLeft: "5px", color: "white", cursor: "pointer" }}
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
                // value={postText}
                // onChange={(e) => setPostText(e.target.value)}
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
              />
              <SendIcon sx={{ color: "white", cursor: "pointer" }} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default Home;
