import React from "react";
import SearchEngine from "./SearchEngine";
import "./Weather.css";

export default function Weather() {
  return (
    <div className="Weather container">
      <div className="card">
        <SearchEngine />
      </div>
    </div>
  );
}