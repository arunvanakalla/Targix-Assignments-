import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../styles/Weather.css";

function Weather() {
    const { city } = useParams();
    const getWeather = async (city) => {
        const API_KEY = "c04e7f6fecf3ec6ba800a58d99947fb6";
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        return res.data;
    }

    const {data ,isLoading ,isError ,error ,refetch} = useQuery({
        queryKey : ["weather" , city],
        queryFn : () => getWeather(city),
        enabled : !!city,
        retry : 1,
    });

    if (!city) {
        return (
        <h2 className="weather-no-city">
        📰 Please search for a city first to view related weather.
        </h2>
        );
    }

    if (isLoading) {
     return <h2 className="weather-loading">Loading weather data...</h2>;
    }

    if (isError) {
      return (
        <div className="weather-error">
            <h2>❌ {error.message}</h2>
            <button onClick={() => refetch()}>Try Again</button>
        </div>
        );
    }

    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
    const weatherDetails = data.weather?.[0];
    const visibilityKm = typeof data.visibility === "number" ? (data.visibility / 1000).toFixed(1) : "N/A";
    const windGust = data.wind?.gust;
    const seaLevel = data.main?.sea_level;

    return (
        <section className="weather-wrapper">
            <div className="weather-container">
                <header className="weather-header">
                    <p className="weather-breadcrumb">Current conditions</p>
                    <h1>Weather in {formattedCity}</h1>
                    <p className="weather-summary">{weatherDetails?.description ?? "Weather update"}</p>
                </header>

                <div className="weather-primary">
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherDetails?.icon ?? "01d"}@4x.png`}
                        alt={weatherDetails?.main ?? "Weather icon"}
                    />
                    <div className="weather-now">
                        <p className="weather-temp">{Math.round(data.main.temp)}°C</p>
                        <p className="weather-feels">
                            Feels like {Math.round(data.main.feels_like)}°C • {weatherDetails?.main ?? "--"}
                        </p>
                    </div>
                    <dl className="weather-meta">
                        <div>
                            <dt>Humidity</dt>
                            <dd>{data.main.humidity}%</dd>
                        </div>
                        <div>
                            <dt>Wind</dt>
                            <dd>{Math.round(data.wind.speed)} m/s</dd>
                        </div>
                        <div>
                            <dt>Pressure</dt>
                            <dd>{data.main.pressure} hPa</dd>
                        </div>
                    </dl>
                </div>

                <div className="weather-grid">
                    <div className="weather-item">
                        <span>🌡️</span>
                        <div>
                            <p className="label">Min / Max</p>
                            <p>{Math.round(data.main.temp_min)}°C / {Math.round(data.main.temp_max)}°C</p>
                        </div>
                    </div>
                    <div className="weather-item">
                        <span>💧</span>
                        <div>
                            <p className="label">Humidity</p>
                            <p>{data.main.humidity}%</p>
                        </div>
                    </div>
                    <div className="weather-item">
                        <span>🌬️</span>
                        <div>
                            <p className="label">Wind gusts</p>
                            <p>{windGust ? `${Math.round(windGust)} m/s` : "N/A"}</p>
                        </div>
                    </div>
                    <div className="weather-item">
                        <span>🌫️</span>
                        <div>
                            <p className="label">Visibility</p>
                            <p>{visibilityKm} km</p>
                        </div>
                    </div>
                    <div className="weather-item">
                        <span>☁️</span>
                        <div>
                            <p className="label">Cloud cover</p>
                            <p>{data.clouds.all}%</p>
                        </div>
                    </div>
                    <div className="weather-item">
                        <span>🌡️</span>
                        <div>
                            <p className="label">Sea level</p>
                            <p>{seaLevel ? `${seaLevel} hPa` : "N/A"}</p>
                        </div>
                    </div>
                </div>

                <footer className="weather-footer">
                    <button className="weather-refresh" onClick={() => refetch()}>
                        Refresh data
                    </button>
                    <div className="weather-links">
                        <Link to={`/news/${city}`}>See local news →</Link>
                        <Link to={`/images/${city}`}>Browse city photos →</Link>
                    </div>
                </footer>
            </div>
        </section>
    );
}

export default Weather;