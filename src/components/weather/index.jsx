import { useState, useEffect } from 'react';
import Search from '../search';

const Weather = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async (param) => {
        setLoading(true);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=c9e7c6162294d329704eb22127149f19`
            );

            const data = await response.json();

            if (data) {
                setWeatherData(data);
                setLoading(false);
                setError(null)
            }

        } catch (e) {
            setError(e.message)
            setLoading(false)
        }
    };

    const handleSearch = () => {
        fetchWeatherData(search);
    };

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    };

    useEffect(() => {
        fetchWeatherData('Accra')
    }, [])

    return (
        <div className="weather-container">
            <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
            {
                error ? <h3>{error}. There was an error</h3> : null
            }
            {
                loading ?
                    <h3 className="loading">Loading...</h3>
                    : <div>
                        <div className="city-name">
                            <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>

                            <div className="coordinate-info">
                                <div className="columns">
                                    <div>
                                        <p>{weatherData?.coord?.lon}</p>
                                        <p>Longitude</p>
                                    </div>
                                </div>

                                <div className="columns">
                                    <div>
                                        <p>{weatherData?.coord?.lat}</p>
                                        <p>Latitude</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="date">
                            <span>{getCurrentDate()}</span>
                        </div>

                        <div className="temp">{weatherData?.main?.temp}&#176;C</div>
                        <p><b>Pressure:</b> {weatherData?.main?.pressure}</p>
                        <p className="description">
                            {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ''}
                        </p>
                        <div className="weather-info">
                            <div className="columns">
                                <div>
                                    <p className="wind">{weatherData?.wind?.speed}</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>

                            <div className="columns">
                                <div>
                                    <p className="humidity">{weatherData?.main?.humidity}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
};

export default Weather;