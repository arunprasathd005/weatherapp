import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async (cityName) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5001/weather?city=${encodeURIComponent(cityName)}`);
            setWeatherData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeather(city);
    };

    useEffect(() => {
        // Fetch initial weather data for default city on component mount
        fetchWeather('New York');
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!weatherData) return null; // Handle case where weatherData is null initially

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter City:
                    <input type="text" value={city} onChange={handleCityChange} />
                </label>
                <button type="submit">Get Weather</button>
            </form>
            <h1>Weather in {weatherData.name}</h1>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Cloud Coverage: {weatherData.clouds.all}%</p>
        </div>
    );
};

export default Weather;
