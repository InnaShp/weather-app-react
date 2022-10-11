import React from "react";
import SearchEngine from "./SearchEngine";
import "./Weather.css";

export default function Weather() {
  return (
    <div className="Weather container">
      <div className="card">
        <SearchEngine />
      </div>
      <small><a href="https://github.com/InnaShp/weather-app-react#:~:text=/-,weather%2Dapp%2Dreact,-Public" target="_blank" rel="noreferrer" className="git-link">Open-source code</a> , by Inna Shpachynska</small>
    </div>
  );
}