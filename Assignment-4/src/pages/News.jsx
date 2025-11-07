import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../styles/News.css";

function News() {
    const {city} = useParams();
    const fetchNews = async (city) => {
        const API_KEY = "93fefc0a35c062ac7bc577cc10bcc23f";
        const res = await axios.get(`https://gnews.io/api/v4/search?q=${city}&lang=en&max=9&token=${API_KEY}`);
        return res.data.articles || [];
    }
    
    const {data ,isLoading ,isError ,error ,refetch } = useQuery({
        queryKey : ["news" , city],
        queryFn : () => fetchNews(city),
        enabled: !!city,
        retry : 1, 
    })
    
    if (!city) {
        return (
        <h2 className="news-no-city">
        📰 Please search for a city first to view related news.
        </h2>
        );
    }
    
    if (isLoading)
    return <h2 className="news-loading">Loading news for {city}...</h2>;

    if (isError)
    return (
        <div className="news-error">
        <h2>❌ {error.message}</h2>
        <button onClick={() => refetch()}>Try Again</button>
        </div>
    );

    if (!data || data.length === 0) {
    return (
        <h3 className="news-empty">
        No news found for {city.charAt(0).toUpperCase() + city.slice(1)}.
        </h3>
    );
    }

      return (
        <div className="news-container">
        <h1 className="news-title">
            📰 Latest News in {city.charAt(0).toUpperCase() + city.slice(1)}
        </h1>
        <div className="news-grid">
        {data.map((article, index) => (
            <div
                key={index}
                className="news-card"
            >
                <h3>{article.title}</h3>
                <p>{article.description || "No description available."}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                🔗 Read More
                </a>
            </div>
        ))}
        </div>
        </div>
    );
}

export default News;