import React  from "react";
import styles from "./profileScreen.module.css";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import GroupsIcon from "@mui/icons-material/Groups";
import BasicModal from "../common/Modal/Modal";
import BasicTabs from "../common/Tabs/Tabs";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import Stack from "@mui/material/Stack";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function ProfileScreen() {
  const { user } = useAuthContext();

  return (
    <>
      <Box className={styles.profileMainContainer}>
        <Box className={styles.titles}>
          <Box className={styles.userName}>
            <h3 style={{ marginBottom: "-10px" }}>{user?.name}</h3>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ color: "#777777" }}>
                {user?.initial ? user.initial : "Insert Name"}
              </p>
              <p className={styles.cloudMixNet}>cloudMix.net</p>
            </Box>
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt="G"
                  src={user?.image}
                  sx={{ width: 80, height: 80 }}
                />
              </StyledBadge>
            </Stack>
          </Box>
        </Box>

        <Box className={styles.UserDescription}>
          <Box sx={{ color: "#777777" }}>
            - {user?.Bios?.Bio1 === undefined ? "Insert Bio" : user.Bios.Bio1}
          </Box>
          <Box sx={{ color: "#777777" }}>
            - {user?.Bios?.Bio2 === undefined ? "Insert Bio" : user.Bios.Bio2}
          </Box>
          <Box sx={{ color: "#777777" }}>
            - {user?.Bios?.Bio3 === undefined ? "Insert Bio" : user.Bios.Bio3}
          </Box>
          <Box sx={{ color: "#777777" }}>
            - {user?.Bios?.Bio4 === undefined ? "Insert Bio" : user.Bios.Bio4}
          </Box>
        </Box>

        <Box className={styles.followersCount}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "110px",
            }}
          >
            <GroupsIcon fontSize="medium" />
            <p style={{ fontSize: "11px", color: "#777777" }}>
              {user?.followedUsers?.length}{" "}
              {user?.followedUsers?.length === 1 ? "Follower" : "Followers"}
            </p>
          </Box>
          <Box>
            <img
              src="https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...CCrhNMmBfFwXs1M3EMoAJtlyAthvFv...foz"
              alt="logo"
              width={40}
              height={25}
            />
          </Box>
        </Box>
        <BasicModal className={styles.EditBtn} />
        <Box>
          <BasicTabs />
        </Box>
      </Box>
    </>
  );
}

export default ProfileScreen;
