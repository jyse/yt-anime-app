import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
  return (
    <div className="header">
      <img src="/images/logo.png" alt="logo" />
      <div className="menu">
        <h2>HOME</h2>
        <h2>ANIME LIST</h2>
        <h2>NEW SEASON</h2>
        <h2>MOVIES</h2>
        <h2>POPULAR</h2>
      </div>
      <div className="search-container">
        <SearchIcon />
      </div>
    </div>
  );
}

export default Header;
