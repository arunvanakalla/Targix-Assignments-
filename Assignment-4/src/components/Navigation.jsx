import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useCity } from "../globalContexts/CityContext";

function Navigation() {
  const navigate = useNavigate();
  const { city } = useCity();

  const handleNavClick = (path) => {
    if (city) navigate(`/${path}/${city}`);
    else navigate(`/${path}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0078d7",
          padding: "15px 0",
          gap: "20px",
          color: "white",
          fontWeight: "500",
        }}
      >
        <h1 style={{ marginRight: "auto", marginLeft: "30px", fontSize: "1.5rem" }}>
          🌆 City Explorer
        </h1>
        <NavLink to="/" style={navLinkStyle}>
          Home
        </NavLink>
        <button onClick={() => handleNavClick("weather")} style={navBtnStyle}>
          Weather
        </button>
        <button onClick={() => handleNavClick("news")} style={navBtnStyle}>
          News
        </button>
        <button onClick={() => handleNavClick("images")} style={navBtnStyle}>
          Images
        </button>
        <NavLink to="/about" style={navLinkStyle}>
          About
        </NavLink>
      </nav>

      <div style={{ flex: "1" }}>
        <Outlet />
      </div>

      <footer
        style={{
          backgroundColor: "#0078d7",
          color: "white",
          textAlign: "center",
          padding: "15px 0",
          fontSize: "14px",
          marginTop: "auto",
        }}
      >
        <p>
          © {new Date().getFullYear()} CityExplorer | Developed by{" "}
          <strong>Arun Kumar Vanakalla</strong>
        </p>
      </footer>
    </div>
  );
}

const navLinkStyle = ({ isActive }) => ({
  color: isActive ? "#ffd700" : "white",
  textDecoration: "none",
  fontSize: "16px",
});

const navBtnStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "500",
};

export default Navigation;
