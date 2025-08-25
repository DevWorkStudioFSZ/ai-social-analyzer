import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Home, BarChart3, Info, Phone } from "lucide-react";

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("/api/notify")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.notifications)) setNotifications(data.notifications);
      })
      .catch(() => {});
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{ backgroundColor: "#0F2557" }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <Link href="/home" className="navbar-brand d-flex align-items-center">
          <img
            src="/logo.png"
            alt="MarketMate Logo"
            width="40"
            height="40"
            className="rounded me-2"
          />
          <span className="fw-semibold text-light">MarketMate</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mmNav"
          aria-controls="mmNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="mmNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

            <li className="nav-item">
              <Link href="/home" className="nav-link d-flex align-items-center gap-1 text-white">
                <Home size={16} /> Home
              </Link>
            </li>

            {/* Insights dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center gap-1 text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BarChart3 size={16} /> Insights
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <Link className="dropdown-item" href="/baseline-times">
                    Baseline Times
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/trends">
                    Trends
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link href="/about" className="nav-link d-flex align-items-center gap-1 text-white">
                <Info size={16} /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link d-flex align-items-center gap-1 text-white">
                <Phone size={16} /> Contact
              </Link>
            </li>

            {/* Notifications */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-sm btn-outline-light d-flex align-items-center gap-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                type="button"
              >
                <Bell size={18} /> {notifications.length}
              </button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                {notifications.length ? (
                  notifications.map((n, i) => (
                    <li key={i}>
                      <span className="dropdown-item small">{n}</span>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="dropdown-item text-muted small">
                      No notifications
                    </span>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Custom Styling */}
      <style jsx>{`
        .navbar {
          --bs-navbar-padding-y: 0.6rem;
        }
        .navbar .navbar-nav .nav-link {
          font-weight: 500;
          color: #ffffff !important;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .navbar .navbar-nav .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.15) !important;
          color: #ffffff !important;
        }
        .dropdown-menu {
          min-width: 12rem;
        }
        .btn-outline-light:hover {
          background-color: #1b2a4a;
          color: #f5f7fa;
        }
        .nav-item {
          margin-right: 0.01rem;
          margin-left: 0.01rem;
          text-color: #ffffff;
          }
      `}</style>
    </nav>
  );
}
