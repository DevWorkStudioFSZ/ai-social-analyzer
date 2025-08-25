// pages/baseline-times.jsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaClock } from "react-icons/fa";
import {
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";

export default function BaselineTimes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/baseline-times")
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Baseline fetch error:", err);
        setData({ error: "Unable to fetch baseline times" });
        setLoading(false);
      });
  }, []);

  const getPlatformIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes("instagram")) return <FaInstagram size={36} color="#E4405F" />;
    if (p.includes("tiktok")) return <FaTiktok size={36} color="#FFFFFF" />;
    if (p.includes("linkedin")) return <FaLinkedin size={36} color="#0A66C2" />;
    if (p.includes("twitter") || p.includes("x")) return <FaTwitter size={36} color="#1DA1F2" />;
    if (p.includes("youtube")) return <FaYoutube size={36} color="#FF0000" />;
    if (p.includes("facebook")) return <FaFacebook size={36} color="#1877F2" />;
    return <FaClock size={36} className="text-light" />;
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-5 text-center text-light" style={{ backgroundColor: "#e8ecf3ff" }}>Loading baseline times...</div>
      </Layout>
    );
  }

  if (data?.error) {
    return (
      <Layout>
        <div className="py-5 text-center text-danger" style={{ backgroundColor: "#e8ecf3ff" }}>{data.error}</div>
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
          <h1 className="text-center fw-bold mb-4" style={{ color: "#0F2557" }}>
            Baseline Posting Times
          </h1>
          <p className="text-center mb-5" style={{ color: "#0F2557" }}>
            Recommended posting times per platform based on engagement data.
          </p>

          <div className="row g-4">
            {data?.times &&
              Object.entries(data.times).map(([platform, times]) => (
                <div key={platform} className="col-md-6 col-lg-4">
                  <div
                    className="card shadow-sm border-0 p-4 h-100 text-center"
                    style={{
                      borderRadius: "16px",
                      backgroundColor: "#0F2557",
                      color: "#ffffff",
                    }}
                  >
                    <div className="mb-3">{getPlatformIcon(platform)}</div>
                    <h5 className="fw-bold text-white">{platform}</h5>
                    <ul className="list-unstyled mt-3 mb-3 text-white-100">
                      {times?.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                    {data?.sources?.[platform] && (
                      <p className="small text-white-100">
                        Sources: {data.sources[platform].join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>

  );
}
