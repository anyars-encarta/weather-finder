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

    useEffect(() => {
        fetchWeatherData('Accra')
    }, [])

    console.log(weatherData)

    return (
        <div className="weather-container">
            <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
            {
                loading ?
                    <h3>Loading data. Please wait...</h3>
                    : <div>
                        <div className="city-name">
                            <h3>{weatherData?.name}, <span>{weatherData?.sys.country}</span></h3>
                        </div>
                    </div>
            }
            Weather
        </div>
    )
};

export default Weather;