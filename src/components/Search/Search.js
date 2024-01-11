import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Triangle } from 'react-loader-spinner'


function Search() {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const uid = auth?.currentUser?.uid;
  const [loadingMap, setLoadingMap] = useState({});
  const [loader, setLoader ] = useState(false);
  const displayedUserId = user?.uid;
  const [isShown, setIsShown] = useState(false);
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const fetchAllUsers = async () => {
    setLoader(true)
    const db = getFirestore();
    const usersCollection = collection(db, "users");
    try {
      const usersSnapshot = await getDocs(usersCollection);

      const allUsersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllUsers(allUsersData);
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

  useEffect(() => {
    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [name, allUsers]);

  const handleFollowUser = async (user) => {
    console.log("clicked", user);
    setLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [user.id]: true,
    }));

    try {
      // Fetching the existing user data of the user being clicked
      const clickedUserDocRef = doc(db, "users", user.uid);
      const clickedUserDoc = await getDoc(clickedUserDocRef);

      if (clickedUserDoc.exists()) {
        const clickedUserData = clickedUserDoc.data();

        // Update the clicked user's data by appending the current user to their followedUsers
        const updatedClickedUserData = {
          ...clickedUserData,
          followedUsers: [...(clickedUserData.followedUsers || []), uid],
        };

        // Update Firestore document of the clicked user with the updated data
        await setDoc(clickedUserDocRef, updatedClickedUserData);
        fetchAllUsers();
        setLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [user.id]: false,
        }));
      } else {
        console.error("Clicked user document does not exist");
        setLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [user.id]: false,
        }));
      }
    } catch (error) {
      console.error("Error updating clicked user profile: ", error);
    } finally {
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [user.id]: false,
      }));
    }
  };

  const handleUnfollowUser = async (user) => {
    console.log("Unfollow clicked", user);

    setLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [user.id]: true,
    }));

    try {
      // Fetching the existing user data of the user being unfollowed
      const unfollowedUserDocRef = doc(db, "users", user.uid);
      const unfollowedUserDoc = await getDoc(unfollowedUserDocRef);

      if (unfollowedUserDoc.exists()) {
        const unfollowedUserData = unfollowedUserDoc.data();

        // Remove the current user from the followedUsers array
        const updatedUnfollowedUserData = {
          ...unfollowedUserData,
          followedUsers: unfollowedUserData.followedUsers.filter(
            (userId) => userId !== uid
          ),
        };

        // Update Firestore document of the unfollowed user with the updated data
        await setDoc(unfollowedUserDocRef, updatedUnfollowedUserData);
        fetchAllUsers();
      } else {
        console.error("Unfollowed user document does not exist");
      }
    } catch (error) {
      console.error("Error updating unfollowed user profile: ", error);
    } finally {
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [user.id]: false,
      }));
    }
  };


  return (
    <Box sx={searchMainContainer}>
      <Box
        sx={{
          // marginTop: "50px",
          width: "90%",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search available user"
          onChange={handleChange}
          style={{
            width: "60%",
            height: "50px",
            background: "#0A0A0A",
            color: "white",
            borderRadius: "10px",
            paddingLeft: "6px",
            border: "1px solid #1e1e1e",
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "30px",
          background: "#101010",
        }}
      >
        {!loader ? (
          <>
           {filteredUsers
          .filter((filteredUser) => filteredUser.id !== user?.uid)
          .map((user) => (
            <Box
              key={user.id}
              sx={{
                borderBottom: "1px solid #777777",
                width: "60%",
                marginTop: "10px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "270px",
                }}
              >
                <Box sx={{ marginRight: "50px" }}>
                  {user?.image && (
                    <img
                      src={user?.image}
                      alt=""
                      width={50}
                      height={50}
                      style={{ borderRadius: "50%" }}
                    />
                  )}

                  {!user?.image && (
                    <AccountCircleIcon sx={{ width: "50px", height: "50px" }} />
                  )}
                </Box>
                <Box
                  sx={{
                    lineHeight: "7px",
                    color: "white",
                    width: "200px",
                  }}
                >
                  <Link
                    to={"/user/" + user?.id}
                    style={{
                      textDecoration: isShown[user.id] ? "underline" : "none",
                      color: "white",
                    }}
                    onMouseEnter={() =>
                      setIsShown((prev) => ({ ...prev, [user.id]: true }))
                    }
                    onMouseLeave={() =>
                      setIsShown((prev) => ({ ...prev, [user.id]: false }))
                    }
                  >
                    <p style={{ textTransform: "uppercase", fontSize: "13px" }}>
                      {user?.name}
                    </p>
                  </Link>
                  <p style={{ color: "#777777", fontSize: "11px" }}>
                    @{user?.initial}
                  </p>
                  <p style={{ fontSize: "11px", color: "#777777" }}>
                    <span style={{ marginRight: "5px" }}>
                      {user?.followedUsers ? user.followedUsers.length : 0}
                    </span>
                    <span>
                      {" "}
                      {user?.followedUsers?.length === 1
                        ? "Follower"
                        : "Followers"}
                    </span>
                  </p>
                </Box>
              </Box>

              <Box sx={{ marginRight: "30px" }}>
                <button
                  style={button}
                  onClick={async () => {
                    if (
                      user?.followedUsers
                        ? user.followedUsers.includes(displayedUserId)
                        : false
                    ) {
                      // If already following, unfollow
                      await handleUnfollowUser(user);
                    } else {
                      // If not following, follow
                      const isFollowing = await handleFollowUser(user);
                      if (isFollowing) {
                        console.log("Now following the user");
                      } else {
                        console.log("Error or already following the user");
                      }
                    }
                  }}
                >
                  {loadingMap[user.id] ? (
                    <CircularProgress size={20} style={{ color: "grey" }} />
                  ) : (
                    <>
                      {user?.followedUsers
                        ? user.followedUsers.includes(displayedUserId)
                          ? "unfollow"
                          : "follow"
                        : "follow"}
                    </>
                  )}
                </button>
              </Box>
            </Box>
          ))}
          </>

        )
        :
        (
          <Triangle
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
        )
      }
       
      </Box>
    </Box>
  );
}

export default Search;

const button = {
  border: "1px solid grey",
  background: "#1e1e1e",
  color: "white",
  width: "200px",
  height: "40px",
  borderRadius: "10px",
  cursor: "pointer",
};

const searchMainContainer = {
  // justifyContent: "center",
  // height: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  background: "#101010",
  marginTop: "120px",
};
