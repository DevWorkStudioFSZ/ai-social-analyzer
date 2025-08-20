
// components/Navbar.jsx
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    document.body.className = darkMode ? "bg-dark text-white" : "bg-light text-dark";

    // Fetch notifications from backend
    fetch("/api/notify")  // make sure this points to your FastAPI endpoint
      .then((res) => res.json())
      .then((data) => {
        if (data.notifications) setNotifications(data.notifications);
      })
      .catch(console.error);
  }, [darkMode]);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark" : "bg-light"}`}>
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center" href="/home">
          <img src="/logo.png" alt="MarketMate Logo" width="60" height="60" className="me-2 rounded" />
          <span className={`fs-4 ${darkMode ? "text-white" : "text-dark"}`}>MarketMate</span>
        </Link>

        {/* Navbar Links */}
        <div className="d-flex align-items-center">

          <Link className={`nav-link me-4 ${darkMode ? "text-white" : "text-dark"}`} href="/home">
            Home
          </Link>

          

          {/* Insights Dropdown */}
          <div className="dropdown me-4">
            <button
              className={`btn dropdown-toggle ${darkMode ? "btn-outline-light text-white" : "btn-outline-dark text-dark"}`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Insights
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/baseline-times">Baseline Times</Link></li>
              <li><Link className="dropdown-item" href="/trends">Trends</Link></li>
            </ul>
          </div>

          {/* About & Contact */}
          <Link className={`nav-link me-4 ${darkMode ? "text-white" : "text-dark"}`} href="/about">
            About
          </Link>
          <Link className={`nav-link me-4 ${darkMode ? "text-white" : "text-dark"}`} href="/contact">
            Contact
          </Link>

          {/* Notifications Dropdown */}
          <div className="dropdown me-4">
            <button
              className={`btn dropdown-toggle ${darkMode ? "btn-outline-light text-white" : "btn-outline-dark text-dark"}`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Notifications ({notifications.length})
            </button>
            <ul className="dropdown-menu">
              {notifications.length > 0
                ? notifications.map((note, i) => (
                    <li key={i}><span className="dropdown-item">{note}</span></li>
                  ))
                : <li><span className="dropdown-item text-muted">No notifications</span></li>
              }
            </ul>
          </div>

          {/* Dark/Light Toggle */}
          <button
            className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

        </div>
      </div>
    </nav>
  );
}
