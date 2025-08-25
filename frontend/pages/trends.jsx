// pages/trends.jsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  FaChartLine,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Trends() {
  const [data, setData] = useState(null);
  const [keywords, setKeywords] = useState("instagram,tiktok,linkedin");
  const [loading, setLoading] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/trends?keywords=${keywords}`
      );
      const json = await res.json();
      setData(json.top_hours || {});
    } catch (err) {
      console.error("Trends fetch error", err);
      setData({ error: "Unable to fetch trends" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const getPlatformIcon = (platform) => {
    const lower = platform.toLowerCase();
    if (lower.includes("instagram"))
      return <FaInstagram size={36} style={{ color: "#E1306C" }} />;
    if (lower.includes("tiktok"))
      return <SiTiktok size={36} style={{ color: "#FFFFFF" }} />;
    if (lower.includes("linkedin"))
      return <FaLinkedin size={36} style={{ color: "#0A66C2" }} />;
    if (lower.includes("youtube"))
      return <FaYoutube size={36} style={{ color: "#FF0000" }} />;
    if (lower.includes("facebook"))
      return <FaFacebook size={36} style={{ color: "#1877F2" }} />;
    if (lower.includes("twitter") || lower.includes("x"))
      return <FaTwitter size={36} style={{ color: "#1DA1F2" }} />;
    return <FaChartLine size={36} className="text-light" />;
  };

  if (loading) {
    return (
      <Layout>
        <div
          className="py-5 text-center text-light"
          style={{ backgroundColor: "#e8ecf3ff" }}
        >
          Loading...
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div
          className="py-5 text-center text-light"
          style={{ backgroundColor: "#e8ecf3ff" }}
        >
          No data
        </div>
      </Layout>
    );
  }

  if (data.error) {
    return (
      <Layout>
        <div
          className="py-5 text-center text-danger"
          style={{ backgroundColor: "#e8ecf3ff" }}
        >
          {data.error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="py-5"
        style={{ backgroundColor: "#e8ecf3ff", minHeight: "100vh" }}
      >
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-5">
            <FaChartLine size={42} style={{ color: "#0F2557" }} />
            <h1 className="fw-bold mb-2" style={{ color: "#0F2557" }}>
              Trending Hours
            </h1>
            <p style={{ color: "#0F2557" }}>
              See the most active hours for your favorite platforms.
            </p>
          </div>

          {/* Keywords input */}
          <div className="d-flex justify-content-center mb-5">
            <input
              type="text"
              className="form-control me-2 shadow-sm"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter comma-separated keywords"
              style={{
                maxWidth: "400px",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
              }}
            />
            <button
              className="btn px-4"
              style={{
                borderRadius: "12px",
                backgroundColor: "#0F2557",
                color: "#ffffff",
              }}
              onClick={fetchTrends}
            >
              Fetch
            </button>
          </div>

          {/* Cards */}
          <div className="row g-4">
            {Object.entries(data).map(([kw, hours]) => (
              <div key={kw} className="col-md-6 col-lg-4">
                <div
                  className="card shadow-sm border-0 p-4 h-100 text-center"
                  style={{
                    borderRadius: "16px",
                    backgroundColor: "#0F2557",
                    color: "#ffffff",
                  }}
                >
                  <div className="mb-3">{getPlatformIcon(kw)}</div>
                  <h5 className="fw-bold text-white">
                    {kw.charAt(0).toUpperCase() + kw.slice(1)}
                  </h5>
                  <ul className="list-unstyled mt-3 mb-0 text-white-100">
                    {hours.map((h, i) => (
                      <li key={i} className="mb-1">
                        {h}:00 – {(h + 1) % 24}:00
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
