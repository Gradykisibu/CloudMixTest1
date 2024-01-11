import React from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

function Layout({ children }) {
  const params = useLocation();
  const signup = "/signup";
  const login = "/login";
  const forgot = "/account/reset/password";

  return (
    <div>
      {params.pathname === signup ||
      params.pathname === login ||
      params.pathname === forgot ? (
        <>
       {children}
        </>
      ) : (
        <>
        <Box sx={{width:"100%", height:"80px"}}>
        <Navbar />
        </Box>
        <Box sx={{width:"100%",}}>
        {children}
        </Box>
        </>
      )}
    </div>
  );
}

export default Layout;
