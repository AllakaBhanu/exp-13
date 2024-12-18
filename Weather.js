import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Import the CSS file for styling
const Weather = () => {
  const [city, setCity] = useState(''); // State to store city name input
  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors

  // Replace with your actual API key
  const API_KEY = 'ca047fab02484671a54497e515f09b9e'; 

  const fetchData = async () => {
    // Check if the city input is not empty
    if (!city.trim()) {
      setError('Please enter a city name');
      return; // Don't make the request if the city is empty
    }

    setLoading(true);  // Start loading
    setError(null);    // Reset error before making a new request
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);  // Set the weather data when successful
    } catch (error) {
      setError('Failed to fetch weather data'); // Handle errors
      console.error(error);
    }
    setLoading(false);  // Stop loading
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);  // Update city as user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(); // Fetch weather data when form is submitted
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading weather data...</p>}

      {error && <p>{error}</p>}

      {weatherData && !loading && !error && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like: {weatherData.main.feels_like}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Pressure: {weatherData.main.pressure}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
