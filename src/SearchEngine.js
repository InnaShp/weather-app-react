import React, { useState } from "react";
import axios from "axios";
import "./SearchEngine.css";

export default function SearchEngine() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [date, setDate ] = useState("");
  const [weeklyForecast, setWeeklyForecast ] = useState("");
  

  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    
    if (hours < 10) {
      hours = `0${hours}`;
    }
    
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    setDate(`${day} ${hours}:${minutes}`);
  }

  

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      name: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
    formatDate(response.data.dt * 1000);

  }

  function searchCity(value){
    let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(showWeather);
  }
  function handleSubmit(event) {
    event.preventDefault();
    searchCity(city);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-10">
          <input type="search" className="form-control enter-city" placeholder="Type a city.." onChange={updateCity} />
        </div>
        <div className="col-1">
          <button className="search" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
        <div className="col-1">
          <button className="current">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
            </svg>
          </button> 
        </div>
      </div>
    </form>
  );

  if (loaded) {
    return (
      <div className="SearchEngine">
        {form}
        <div className="row">
          <div className="col-6 text-start">
            <h1>{weather.name}</h1>
            <ul className="text-muted">
              <li>
                {date}
              </li>
              <li>
                {weather.description}
              </li>
              <li>
                Humidity: {Math.round(weather.humidity)}%, 
                Wind: {Math.round(weather.wind)} km/h
              </li>
            </ul>
          </div>
          <div className="col-6">
            <h2><img src={weather.icon} alt="Weather icon" className="weather-icon" />{Math.round(weather.temperature)} <span className="celsium">°C</span></h2>
          </div>
        </div>
        
      
      </div>
    );
  } else {
    return (
      <div className="SearchEngine">
        {form} 
        {searchCity("Kyiv")}
      </div>
    );
  }
  
}