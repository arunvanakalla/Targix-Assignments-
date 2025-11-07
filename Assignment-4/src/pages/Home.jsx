import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { useCity } from "../globalContexts/CityContext";

function Home() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { city , setCity } = useCity();

  const handleSearch = (e) => {
    e.preventDefault();
    if (input === "") return alert("Please enter a city name!");
    setCity(input)
    navigate(`/weather/${input}`);
  };

  const clearContext = () => {
    if (city) {
      alert("Cleared last searched city!");
      setCity("");
      setInput("");
    } else {
      alert("No city to clear.");
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">
        🌆 Welcome to CityExplorer
      </h1>
      <p className="home-description">
        Discover weather updates, breaking news, and stunning images for any
        city in the world.
      </p>

      <form onSubmit={handleSearch} className="home-form">
        <input
          type="text"
          placeholder="Enter a city name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="home-input"
        />
        <button
          type="submit"
          className="home-button"
        >
          🔍 Explore
        </button>
        <button
          type="button"
          className="home-button"
          onClick={clearContext}
        >
          clear search
        </button>
      </form>
    </div>
  );
}

export default Home;
