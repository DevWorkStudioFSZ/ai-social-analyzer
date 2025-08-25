// pages/competitors.jsx
import { useState } from "react";
import Layout from "../components/Layout";
import { Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaGlobe,
  FaChartBar, 
} from "react-icons/fa";

export default function Competitors() {
  const [companyName, setCompanyName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:8000/api/competitors/analyze?company_name=${encodeURIComponent(
          companyName
        )}&limit=6`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getPlatformIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes("instagram")) return <FaInstagram color="#E4405F" />;
    if (p.includes("tiktok")) return <FaTiktok color="#000000" />;
    if (p.includes("linkedin")) return <FaLinkedin color="#0A66C2" />;
    if (p.includes("twitter") || p.includes("x")) return <FaTwitter color="#1DA1F2" />;
    if (p.includes("youtube")) return <FaYoutube color="#FF0000" />;
    if (p.includes("facebook")) return <FaFacebook color="#1877F2" />;
    return <FaGlobe color="#555" />;
  };

  return (
    <Layout>
      <div style={{ backgroundColor: "#e8ecf3ff", minHeight: "100vh" }}>
        <div className="container py-5">
          <h1 className="text-center fw-bold mb-4" style={{ color: "#0F2557" }}>
            Competitor Analysis
          </h1>
          <p className="text-center text-muted mb-5">
            Enter a company name to analyze competitors and compare online presence.
          </p>

          {/* Input & Button */}
          <div className="d-flex justify-content-center mb-4">
            <input
              type="text"
              className="form-control w-50 me-2 shadow-sm"
              placeholder="Enter company name"
              style={{ backgroundColor: "#fff", color: "#0F2557" }}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <button
              className="btn"
              onClick={handleAnalyze}
              disabled={loading || !companyName.trim()}
              style={{
                backgroundColor: "#0F2557",
                border: "none",
                color: "#ffffff",

              }}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          {data && (
            <>
              <h3 className="text-center fw-bold mb-4" style={{ color: "#0F2557" }}>
                Results for <span style={{ color: "#FFC107" }}>{data.company}</span>
              </h3>

              {/* Competitors List */}
              <div className="row g-4">
                {data.competitors?.map((comp, idx) => (
                  <div className="col-md-6 col-lg-4" key={idx}>
                    <Card
                      className="h-100 shadow-sm border-0 rounded-3 text-white"
                      style={{
                        backgroundColor: "#1B2A49",
                        borderRadius: "12px",
                      }}
                    >
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="fw-bold" style={{ color: "#ffffff" }}>
                            {comp.name}
                          </h5>
                          <span
                            className="badge d-flex align-items-center justify-content-center"
                            style={{
                              backgroundColor: "#FFC107",
                              color: "#ffffff",
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              fontSize: "18px",
                            }}
                          >
                            <FaChartBar />
                          </span>
                        </div>

                        {comp.website && (
                          <p className="mb-3">
                            <a
                              href={comp.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                              style={{ color: "#ffffff", fontWeight: "500" }}
                            >
                              {comp.website}
                            </a>
                          </p>
                        )}

                        {/* Metrics */}
                        <div className="d-flex justify-content-between text-center mb-3">
                          <div>
                            <div className="small">Presence</div>
                            <div className="fw-bold">{comp.metrics?.presence_score ?? 0}</div>
                          </div>
                          <div>
                            <div className="small">Activity</div>
                            <div className="fw-bold">{comp.metrics?.activity_index ?? 0}</div>
                          </div>
                          <div>
                            <div className="small">Engagement</div>
                            <div className="fw-bold">
                              {comp.metrics?.engagement_rate?.overall ?? 0}
                            </div>
                          </div>
                        </div>

                        {/* Mentions */}
                        {comp.metrics?.mentions_last_30_days && (
                          <div className="mb-3">
                            <h6 className="fw small" style={{ color: "#ffffff" }}>
                              Mentions (30 days)
                            </h6>
                            <div className="d-flex flex-wrap gap-2">
                              {Object.entries(comp.metrics.mentions_last_30_days).map(
                                ([platform, val]) => (
                                  <span
                                    key={platform}
                                    className="badge"
                                    style={{
                                      backgroundColor: "#e8ecf3ff",
                                      color: "#0F2557",
                                    }}
                                  >
                                    {getPlatformIcon(platform)} {val}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Social Links */}
                        {comp.social && (
                          <div>
                            <h6 className=" small" style={{ color: "#ffffff" }}>
                              Social Links
                            </h6>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                              {Object.entries(comp.social)
                                .filter(([, url]) => !!url)
                                .map(([platform, url]) => (
                                  <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-flex align-items-center gap-2 text-decoration-none px-2 py-1 border rounded"
                                    style={{
                                      backgroundColor: "#e8ecf3ff",
                                      color: "#0F2557",
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    {getPlatformIcon(platform)}
                                    <span>{platform}</span>
                                  </a>
                                ))}
                            </div>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Chart */}
              {Array.isArray(data.chart_data) && data.chart_data.length > 0 && (
                <div className="mt-5">
                  <h4 className="fw-bold mb-3 text-center" style={{ color: "#0F2557" }}>
                    Presence vs Activity
                  </h4>
                  <div style={{ width: "100%", height: 360 }}>
                    <ResponsiveContainer>
                      <BarChart data={data.chart_data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="competitor" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="presence_score" fill="#0F2557" />
                        <Bar dataKey="activity_index" fill="#FFC107" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
