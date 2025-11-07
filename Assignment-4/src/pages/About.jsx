import "../styles/About.css";

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">
        🌆 About CityExplorer
      </h1>

      <p>
        <strong>CityExplorer</strong> is a React-based web application that allows
        users to explore key information about any city in the world. With just
        a few clicks, you can check the latest <strong>weather updates</strong>,
        read <strong>local news headlines</strong>, and browse <strong>beautiful
        photos</strong> of the city — all in one place.
      </p>

      <h2 className="about-heading">🚀 Features</h2>
      <ul>
        <li>🔍 Search for any city using the home page search bar.</li>
        <li>🌦 View real-time weather data powered by OpenWeatherMap API.</li>
        <li>📰 Read the latest city-related news via GNews API.</li>
        <li>📸 Browse stunning city photos fetched from Unsplash API.</li>
        <li>⚡ Smooth navigation between pages using React Router.</li>
        <li>🧠 Smart caching and loading management via React Query.</li>
      </ul>

      <h2 className="about-heading">🛠️ Technologies Used</h2>
      <ul>
        <li>⚛️ React.js — for building a dynamic single-page UI</li>
        <li>🧭 React Router — for seamless page navigation</li>
        <li>📡 React Query & Axios — for API fetching and caching</li>
        <li>☁️ OpenWeatherMap API — for weather data</li>
        <li>📰 GNews API — for city-based news</li>
        <li>📷 Unsplash API — for beautiful images</li>
        <li>💅 Custom CSS — for clean, responsive styling</li>
      </ul>

      <h2 className="about-heading">💡 Purpose</h2>
      <p>
        This project was built as part of my training assignment to learn about
        client-side routing, API integration, and asynchronous data handling in
        React. It demonstrates how multiple APIs can be integrated into one
        cohesive application while maintaining clear navigation and state
        management.
      </p>

      <h2 className="about-heading">👨‍💻 Developer</h2>
      <p>
        Developed by <strong>Arun Kumar Vanakalla</strong> — Computer Science
        Engineering student at Geethanjali College of Engineering and
        Technology.
      </p>

      <p className="about-footer-text">
        "Explore cities. Discover stories. Experience the world — one search at
        a time."
      </p>
    </div>
  );
}

export default About;
