import React, { useState } from 'react';
import axios from 'axios';
import './weather.css'; // Import CSS for styling

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'ce3491f7180dae3e0593f79638bc78b6';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching weather:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid API key');
        } else if (err.response.status === 404) {
          setError('City not found');
        } else {
          setError('An error occurred');
        }
      } else {
        setError('Network error');
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature : {weather.main.temp}°C</p>
          <p>Weather : {weather.weather[0].description}</p>
          <p>Humidity : {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
