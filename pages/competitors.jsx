
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

  return (
    <Layout>
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-slide slide1" />
        <div className="bg-slide slide2" />
        <div className="bg-slide slide3" />
      </div>

      {/* Foreground content */}
      <div className="page-wrap">
        <div className="container glass p-4 p-md-5">
          <h1 className="title mb-4">Competitor Analysis</h1>

          {/* Input + Button */}
          <div className="input-row mb-4">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <button
              className="btn btn-secondary analyze-btn text-black"
              onClick={handleAnalyze}
              disabled={loading || !companyName.trim()}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {/* Errors */}
          {error && <p className="text-danger text-center mb-3">{error}</p>}

          {/* Results */}
          {data && (
            <>
              <h3 className="results-title">Results for {data.company}</h3>

              {/* Competitor Cards */}
              <div className="row">
                {data.competitors?.map((comp, idx) => (
                  <div className="col-md-6 mb-4" key={idx}>
                    <Card className="competitor-card h-100">
                      <Card.Body>
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="comp-title">{comp.name}</h5>
                          <span className="badge-glass">
                            {comp.metrics?.presence_score ?? 0}
                          </span>
                        </div>

                        {/* Website */}
                        {comp.website && (
                          <p className="mb-3">
                            <a
                              href={comp.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="comp-link"
                            >
                              {comp.website}
                            </a>
                          </p>
                        )}

                        {/* Metrics */}
                        <div className="metrics-grid">
                          <div className="metric-box">
                            <div className="metric-label">Presence</div>
                            <div className="metric-value">
                              {comp.metrics?.presence_score ?? 0}
                            </div>
                          </div>
                          <div className="metric-box">
                            <div className="metric-label">Activity</div>
                            <div className="metric-value">
                              {comp.metrics?.activity_index ?? 0}
                            </div>
                          </div>
                          <div className="metric-box">
                            <div className="metric-label">Engagement</div>
                            <div className="metric-value">
                              {comp.metrics?.engagement_rate?.overall ?? 0}
                            </div>
                          </div>
                        </div>

                        {/* Mentions */}
                        <div className="mentions mt-3">
                          <h6>Mentions (30 days)</h6>
                          <div className="mentions-tags">
                            {Object.entries(
                              comp.metrics?.mentions_last_30_days || {}
                            ).map(([platform, val]) => (
                              <span key={platform} className="tag">
                                {platform}: <b>{val}</b>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Social Links */}
                        {comp.social && (
                          <div className="social mt-3">
                            <h6>Social Links</h6>
                            <div className="social-icons">
                              {Object.entries(comp.social)
                                .filter(([, url]) => !!url)
                                .map(([platform, url]) => (
                                  <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-pill"
                                  >
                                    {platform}
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

              {/* Chart Section */}
              {Array.isArray(data.chart_data) &&
                data.chart_data.length > 0 && (
                  <div className="chart-wrap mt-4">
                    <h4 className="mb-3">
                      Presence vs Activity (by Competitor)
                    </h4>
                    <div style={{ width: "100%", height: 360 }}>
                      <ResponsiveContainer>
                        <BarChart data={data.chart_data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="competitor" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="presence_score" fill="#3b82f6" />
                          <Bar dataKey="activity_index" fill="#22c55e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
            </>
          )}
        </div>
      </div>

      {/* ========= Scoped Styling ========= */}
      <style jsx>{`
        /* Full-screen animated background */
        .animated-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }
        .bg-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          animation: fadeBg 30s infinite;
          filter: brightness(0.7);
        }
        .slide1 {
          background-image: url("https://plus.unsplash.com/premium_photo-1685214580428-7eae1a78e7bc?q=80&w=1332&auto=format&fit=crop");
          animation-delay: 0s;
        }
        .slide2 {
          background-image: url("https://plus.unsplash.com/premium_photo-1683977922495-3ab3ce7ba4e6?q=80&w=1100&auto=format&fit=crop");
          animation-delay: 10s;
        }
        .slide3 {
          background-image: url("https://plus.unsplash.com/premium_photo-1711134826471-437ee57e8455?q=80&w=1112&auto=format&fit=crop");
          animation-delay: 20s;
        }
        @keyframes fadeBg {
          0% {
            opacity: 0;
            transform: scale(1);
          }
          10% {
            opacity: 1;
            transform: scale(1.05);
          }
          30% {
            opacity: 1;
            transform: scale(1.1);
          }
          40% {
            opacity: 0;
            transform: scale(1.1);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }

        /* Page container */
        .page-wrap {
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 40px 12px;
        }
        .glass {
          background: rgba(50, 50, 50, 0.2);
          color: #fff;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
        }

        /* Headings */
        .title {
          text-align: center;
          font-weight: 800;
        }
        .results-title {
          text-align: center;
          margin: 20px 0 30px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: #333;
        }

        /* Input row */
        .input-row {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .analyze-btn {
          min-width: 140px;
          font-weight: 700;
        }

        /* Competitor card */
        .competitor-card {
          background: rgba(128, 128, 128, 0.25); /* translucent gray */
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          color: #333333; /* dark gray text */
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .competitor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35);
        }
        .comp-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: #2e2e2e; /* dark gray */
        }
        .badge-glass {
          background: rgba(255, 255, 255, 0.08);
          color: #444;
          padding: 6px 10px;
          border-radius: 10px;
          font-size: 0.8rem;
        }
        .comp-link {
          color: #1f3bb3;
          text-decoration: none;
          word-break: break-all;
        }
        .comp-link:hover {
          text-decoration: underline;
        }

        /* Metrics grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 10px;
        }
        .metric-box {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 10px;
          text-align: center;
        }
        .metric-label {
          font-size: 0.75rem;
          color: #666;
        }
        .metric-value {
          font-size: 1rem;
          font-weight: 800;
          margin-top: 2px;
          color: #2e2e2e;
        }

        /* Mentions & tags */
        .mentions h6,
        .social h6 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #444;
          margin-bottom: 8px;
        }
        .mentions-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tag {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          padding: 6px 10px;
          font-size: 0.85rem;
          color: #333;
        }
        .tag b {
          color: #000;
        }

        /* Social pills */
        .social-icons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 6px;
        }
        .social-pill {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(167, 173, 182, 0.12);
          color: #333;
          font-weight: 600;
          font-size: 0.85rem;
          text-decoration: none;
          border: 1px solid rgba(59, 130, 246, 0.08);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .social-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(59, 130, 246, 0.12);
        }

        /* Chart */
        .chart-wrap {
          background: rgba(128, 128, 128, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 16px;
        }

        @media (max-width: 576px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </Layout>
  );
}
