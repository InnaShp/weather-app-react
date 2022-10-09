import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  const [city, setCity] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [data, setData ] = useState("");

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
    setData(`${day} ${hours}:${minutes}`);
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

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(showWeather);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Type a city.." onChange={updateCity} />
      <input type="submit" value="search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="SearchEngine">
        {form}
        <div className="row">
          <div className="col-6">
            <h1>{weather.name}</h1>
            <ul>
              <li>
                {data}
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
            <h2><img src={weather.icon} alt="Weather icon" width="50" />{Math.round(weather.temperature)}°C</h2>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="SearchEngine">{form}</div>;
  }
}