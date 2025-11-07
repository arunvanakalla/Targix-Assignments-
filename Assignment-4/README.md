# 🌆 CityExplorer

A modern React-based web application that allows users to explore comprehensive information about any city in the world. Discover real-time weather updates, latest news headlines, and stunning photographs - all in one beautiful interface.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![React Router](https://img.shields.io/badge/React_Router-7.9.5-CA4245?logo=react-router)
![React Query](https://img.shields.io/badge/React_Query-5.90.7-FF4154?logo=react-query)

## ✨ Features

- 🔍 **City Search** - Search for any city worldwide using an intuitive search interface
- 🌦️ **Real-time Weather** - Get current weather conditions, temperature, humidity, wind speed, and more
- 📰 **Latest News** - Browse city-related news articles from reliable sources
- 📸 **Beautiful Images** - Explore stunning photographs of cities from professional photographers
- ⚡ **Smart Caching** - Efficient data fetching and caching with React Query
- 🧭 **Seamless Navigation** - Smooth page transitions with React Router
- 📱 **Responsive Design** - Works beautifully on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **React.js** (v19.2.0) - Modern UI library for building dynamic interfaces
- **React Router DOM** (v7.9.5) - Client-side routing and navigation
- **React Query** (v5.90.7) - Powerful data synchronization and caching
- **Axios** (v1.13.2) - HTTP client for API requests
- **CSS3** - Custom styling for a clean, modern UI

### APIs Integrated

- **OpenWeatherMap API** - Weather data and forecasts
- **GNews API** - City-based news articles
- **Unsplash API** - High-quality city photographs

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/CityExplorer.git
   cd CityExplorer/city-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API keys** (see API Setup section below)

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

## 🔑 API Setup

This application requires API keys from three services. For security reasons, it's recommended to use environment variables instead of hardcoding keys.

### Getting API Keys

1. **OpenWeatherMap API**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **GNews API**
   - Visit [GNews](https://gnews.io/)
   - Sign up for a free account
   - Obtain your API token

3. **Unsplash API**
   - Visit [Unsplash Developers](https://unsplash.com/developers)
   - Create a developer account
   - Create a new application to get your Access Key

### Using Environment Variables (Recommended)

1. Create a `.env` file in the `city-explorer` directory:
   ```env
   REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
   REACT_APP_NEWS_API_KEY=your_gnews_api_key
   REACT_APP_UNSPLASH_API_KEY=your_unsplash_access_key
   ```

2. Update the API calls in the following files to use environment variables:
   - `src/pages/Weather.jsx` - Replace API key with `process.env.REACT_APP_WEATHER_API_KEY`
   - `src/pages/News.jsx` - Replace API key with `process.env.REACT_APP_NEWS_API_KEY`
   - `src/pages/Images.jsx` - Replace API key with `process.env.REACT_APP_UNSPLASH_API_KEY`

3. **Important**: Add `.env` to your `.gitignore` file to prevent committing API keys

### Current Implementation

⚠️ **Security Note**: The current implementation has API keys hardcoded in the component files. This is not recommended for production. Please migrate to environment variables before deploying.

## 📖 Usage

1. **Search for a City**
   - On the home page, enter a city name in the search bar
   - Click "🔍 Explore" to navigate to the weather page

2. **View Weather Information**
   - See current temperature, conditions, and detailed weather metrics
   - Use the navigation links to explore news and images for the same city

3. **Browse News**
   - Click "News" in the navigation bar
   - View the latest news articles related to your searched city
   - Click "Read More" to open articles in a new tab

4. **Explore Images**
   - Click "Images" in the navigation bar
   - Browse beautiful photographs of the city
   - Click any image to view it on Unsplash

5. **Clear Search**
   - Use the "clear search" button on the home page to reset your search

## 📁 Project Structure

```
city-explorer/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── Navigation.jsx       # Main navigation component
│   ├── globalContexts/
│   │   └── CityContext.jsx     # Global city state management
│   ├── pages/
│   │   ├── Home.jsx            # Home page with search
│   │   ├── Weather.jsx         # Weather information page
│   │   ├── News.jsx            # News articles page
│   │   ├── Images.jsx          # City images gallery
│   │   └── About.jsx           # About page
│   ├── styles/
│   │   ├── App.css
│   │   ├── Home.css
│   │   ├── Weather.css
│   │   ├── News.css
│   │   ├── Images.css
│   │   ├── Navigation.css
│   │   └── About.css
│   ├── App.js                  # Main app component with routing
│   └── index.js                # Entry point
├── package.json
└── README.md
```

## 🎯 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## 🎓 Learning Objectives

This project demonstrates:

- **Client-side routing** with React Router
- **API integration** with multiple third-party services
- **State management** using React Context API
- **Data fetching and caching** with React Query
- **Asynchronous data handling** and error management
- **Responsive UI design** with custom CSS
- **Component-based architecture** in React

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Arun Kumar Vanakalla**

- Computer Science Engineering student at Geethanjali College of Engineering and Technology
- Developed as part of a training assignment to learn React, API integration, and modern web development practices

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [GNews](https://gnews.io/) for news articles
- [Unsplash](https://unsplash.com/) for beautiful city photographs
- [Create React App](https://github.com/facebook/create-react-app) for the project setup

## 📞 Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

**"Explore cities. Discover stories. Experience the world — one search at a time."** 🌍
