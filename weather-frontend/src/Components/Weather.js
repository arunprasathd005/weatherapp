import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(-1);

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

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f8ff', // Added background color
        padding: '20px',
        borderRadius: '8px',
        marginBottom:'10px',
        
        
    };

    const formStyle = {
        marginTop: '40px',
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
        padding: '10px',
        marginRight: '8px',
        borderRadius: '4px',
        border: '3px solid #ddd',
    };

    const buttonStyle = {
        marginTop:'6px',
        padding: '9px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    };

    const cardContainerStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        maxWidth: '600px',
        width: '100%',
    };

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
    };

    const cardHoverStyle = {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    };

    const iconStyle = {
        position: 'absolute',
        top: '16px',
        right: '16px',
        fontSize: '24px',
        color: '#007bff',
    };

    const titleStyle = {
        color: '#007bff',
        fontSize: '1.9rem',
        marginBottom: '14px',
        fontWeight: 'bold',
        fontFamily: 'Georgia, serif',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    };

    const dataStyle = {
        color: '#343a40',
        fontSize: '1.1rem',
        fontFamily: 'Arial, sans-serif',
        marginTop: '8px',
        lineHeight: '1.6',
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!weatherData) return null; // Handle case where weatherData is null initially

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label>
                    Enter City:
                    <input 
                        type="text" 
                        value={city} 
                        onChange={handleCityChange} 
                        style={inputStyle} 
                    />
                </label>
                <button type="submit" style={buttonStyle}>Get Weather</button>
            </form>
            <h1 style={titleStyle}>Weather in {weatherData.name}</h1>
            <div style={cardContainerStyle}>
                <div 
                    style={{ ...cardStyle, ...(hoverIndex === 0 ? cardHoverStyle : {}) }}
                    onMouseEnter={() => setHoverIndex(0)}
                    onMouseLeave={() => setHoverIndex(-1)}
                >
                    <i className="fas fa-thermometer-half" style={iconStyle}></i>
                    <p style={dataStyle}>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                </div>
                <div 
                    style={{ ...cardStyle, ...(hoverIndex === 1 ? cardHoverStyle : {}) }}
                    onMouseEnter={() => setHoverIndex(1)}
                    onMouseLeave={() => setHoverIndex(-1)}
                >
                    <i className="fas fa-cloud-sun" style={iconStyle}></i>
                    <p style={dataStyle}>Weather: {weatherData.weather[0].description}</p>
                </div>
                <div 
                    style={{ ...cardStyle, ...(hoverIndex === 2 ? cardHoverStyle : {}) }}
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(-1)}
                >
                    <i className="fas fa-tint" style={iconStyle}></i>
                    <p style={dataStyle}>Humidity: {weatherData.main.humidity}%</p>
                </div>
                <div 
                    style={{ ...cardStyle, ...(hoverIndex === 3 ? cardHoverStyle : {}) }}
                    onMouseEnter={() => setHoverIndex(3)}
                    onMouseLeave={() => setHoverIndex(-1)}
                >
                    <i className="fas fa-wind" style={iconStyle}></i>
                    <p style={dataStyle}>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
                <div 
                    style={{ ...cardStyle, ...(hoverIndex === 4 ? cardHoverStyle : {}) }}
                    onMouseEnter={() => setHoverIndex(4)}
                    onMouseLeave={() => setHoverIndex(-1)}
                >
                    <i className="fas fa-cloud" style={iconStyle}></i>
                    <p style={dataStyle}>Cloud Coverage: {weatherData.clouds.all}%</p>
                </div>
            </div>
        </div>
    );
};

export default Weather;
