import { Box } from "@mui/material";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import DropDown from "../DropDown/DropDown";
import PostFeed from "../common/PostFeedModal/Feed";


function Navbar() {
  const [activeIcon, setActiveIcon] = useState("home");
  
  const nav = useNavigate();

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
    switch (true) {
      case iconName.includes("search"):
        nav("/search");
        break;
      case iconName.includes("favorite"):
        nav("/activity");
        break;
      case iconName.includes("person"):
        nav("/account/user/profile");
        break;
      case iconName.includes("home"):
        nav("/");
        break;
      default:
        break;
    }
  };


  return (
    <Box sx={navbarContainer}>

      <Box sx={logo}>
        <img
          src="https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...CCrhNMmBfFwXs1M3EMoAJtlyAthvFv...foz"
          alt="logo"
          width={60}
          height={40}
          onClick={() => nav('/')}
        />
      </Box>

      <Box sx={Icons}>
        <Icon iconName="home" activeIcon={activeIcon} onClick={handleIconClick}>
          <HomeIcon fontSize="large" n />
        </Icon>

        <Icon
          iconName="search"
          activeIcon={activeIcon}
          onClick={handleIconClick}
        >
          <SearchIcon fontSize="large" />
        </Icon>

        <Icon iconName="edit" activeIcon={activeIcon} onClick={handleIconClick}>
          {/* <EditNoteIcon fontSize="large" /> */}
          <PostFeed/>
        </Icon>
        <Icon
          iconName="favorite"
          activeIcon={activeIcon}
          onClick={handleIconClick}
        >
          <FavoriteIcon fontSize="large" />
        </Icon>
        <Icon
          iconName="person"
          activeIcon={activeIcon}
          onClick={handleIconClick}
        >
          <PersonOutlineIcon fontSize="large" />
        </Icon>
      </Box>

      <Box sx={menu}>
        <Icon iconName="menu" activeIcon={activeIcon} onClick={handleIconClick}>
          <DropDown/>
        </Icon>
      </Box>
    </Box>
  );
}

const Icon = ({ iconName, activeIcon, onClick, children }) => {
  const isActive = activeIcon === iconName;
  return (
    <div
      onClick={() => onClick(iconName)}
      className={`icon ${isActive ? "active" : "unactive"}`}
    >
      {children}
    </div>
  );
};

export default Navbar;

const navbarContainer = {
  width: "100%",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#101010",
  position: "fixed",
  zIndex:"1"
};

const logo = {
  width: "10%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor:"pointer",
};

const menu = {
  width: "10%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingRight: "40px",
};

const Icons = {
  width: "40%",
  height: "70%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
};
