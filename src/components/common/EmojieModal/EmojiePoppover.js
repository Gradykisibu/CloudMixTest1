//
import React, { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, Tabs, Tab } from "@mui/material";

export default function EmojiePoppover({ inputText, setInputText}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const url =
    "https://emoji-api.com/emojis?access_key=33369701beb7afc6e7e5574ef9f130c296ee5a5f";
  const [emojies, setEmojies] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    function fetchEmojies() {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((results) => {
          setEmojies(results);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }

    fetchEmojies();
  }, []);

  const handleGroupChange = (event, newValue) => {
    setSelectedGroup(newValue);
  };

  const handlePassEmojies = (item) => {
    console.log(item)
    setInputText((prevInputText) => ({
      ...prevInputText,
      [item.id]: (prevInputText[item.id] || "") + item.character,
    }));
  };
  

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box onClick={handleClick}>
        <EmojiEmotionsIcon
          sx={{
            color: "white",
            cursor: "pointer",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Tabs
          value={selectedGroup}
          onChange={handleGroupChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Emojie Groups"
          style={{ width: "400px", background: "#101010" }}
        >
          {Array.from(new Set(emojies.map((emoji) => emoji.group))).map(
            (group, index) => (
              <Tab
                key={index}
                label={group}
                value={group}
                sx={{ color: "white" }}
              />
            )
          )}
        </Tabs>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            width: "400px",
            height: "300px",
            background: "#101010",
            overflowY: "auto",
          }}
        >
          {emojies
            .filter((emoji) => !selectedGroup || emoji.group === selectedGroup)
            .map((item, index) => (
              <Box key={index} sx={{ cursor: "pointer", margin: "4px" }} onClick={() => handlePassEmojies(item)}>
                {item.character}
              </Box>
            ))}
        </Box>

        <Box></Box>
      </Popover>
    </>
  );
}
