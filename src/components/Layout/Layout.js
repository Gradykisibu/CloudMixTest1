import React from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";

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
        <Navbar />
       {children}
        </>
      )}
    </div>
  );
}

export default Layout;
