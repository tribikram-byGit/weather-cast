// Import images
import clear from "./assets/sunny.png";
import clouds from "./assets/clouds.png";
import rain from "./assets/rainy.jpg";
import mist from "./assets/mists.jpg";
import defaultBg from "./assets/miraculous-def.webp";

import { useState } from "react";
import "./App.css";


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  //const API_KEY = process.env.REACT_APP_API_KEY

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const getBackground = () => {
    if (!weather) return defaultBg;

    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("cloud")) return clouds;
    if (condition.includes("rain")) return rain;
    if (condition.includes("mist") || condition.includes("fog")) return mist;
    if (condition.includes("clear")) return clear;

    return defaultBg;
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${getBackground()})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        transition: "background-image 0.8s ease-in-out",
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 🔹 Gradient Overlay */}
      <div className="overlay"></div>

      {/* 🔹 Main Weather Card */}
      <div className={`weather-card ${weather ? "active" : ""}`}>
        <h1>Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {weather ? (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p className="desc">{weather.weather[0].description}</p>
            <h3>{weather.main.temp}°C</h3>
          </div>
        ) : (
          <p className="hint">Enter a city to check the weather ☁️</p>
        )}
      </div>
    </div>
  );
}

export default App;

