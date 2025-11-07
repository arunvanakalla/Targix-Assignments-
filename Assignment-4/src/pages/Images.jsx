import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../styles/Images.css";

function Images() {
  const { city } = useParams();

  const fetchImages = async (city) => {
    const ACCESS_KEY = "QktSXM3qEftcqeOrO97TSJ_yGXDXGG7m7N1OeHSv0ks";
    const res = await axios.get(
      `https://api.unsplash.com/search/photos?query=${city}&per_page=12&client_id=${ACCESS_KEY}`
    );
    return res.data.results || [];
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["images", city],
    queryFn: () => fetchImages(city),
    enabled: !!city,
    retry: 1,
  });

  if (!city) {
    return (
      <h2 className="images-no-city">
        📸 Please search for a city first to view related images.
      </h2>
    );
  }

  if (isLoading)
    return <h2 className="images-loading">Loading images for {city}...</h2>;

  if (isError)
    return (
      <div className="images-error">
        <h2>❌ {error.message}</h2>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );

  if (!data || data.length === 0) {
    return (
      <h3 className="images-empty">
        No images found for {city.charAt(0).toUpperCase() + city.slice(1)}.
      </h3>
    );
  }

  return (
    <div className="images-container">
      <h1 className="images-title">
        📸 Beautiful Photos of {city.charAt(0).toUpperCase() + city.slice(1)}
      </h1>
      <div className="images-grid">
        {data.map((photo) => (
          <div
            key={photo.id}
            className="images-card"
          >
            <a
              href={photo.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="images-link"
            >
              <img
                src={photo.urls.small}
                alt={photo.alt_description || "City photo"}
                className="images-img"
              />
              <div className="images-card-info">
                📍 {photo.user.name}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
