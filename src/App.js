// Import images
import clear from "./assets/sunny.png";
import clouds from "./assets/clouds.png";
import rain from "./assets/rainy.jpg";
import mist from "./assets/mists.jpg";
import defaultBg from "./assets/miraculous-def.webp";

import { useState } from "react";
import { Analytics } from "@vercel/analytics/react"
import "./App.css";


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [notification, setNotification] = useState("");

  const showPopup = (message) => {
    setNotification(message);
    
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else if (res.status === 404 || data.cod === "404") {
        showPopup(" City not found. ");
        return;
      }
    } catch (error) {
      showPopup("Something went wrong.");
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
            <h2>{weather.name} | {weather.main.temp}°C</h2>
            <p className="desc">{weather.weather[0].description}</p>
            <span><small>Feels Like {weather.main.feels_like}°C | Humidity {weather.main.humidity}%</small></span>
          </div>
        ) : (
          <p className="hint">Enter a city to check the weather ☁️</p>
        )}
      </div>

      {notification && (
        <div className="error-popup">
          {notification}
        </div>
      )}

    <Analytics />
    </div>
  );
}

export default App;

