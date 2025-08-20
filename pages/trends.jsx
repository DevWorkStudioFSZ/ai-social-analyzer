
// pages/trends.jsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaChartLine } from "react-icons/fa";

export default function Trends() {
  const [data, setData] = useState(null);
  const [keywords, setKeywords] = useState("instagram,tiktok,linkedin");
  const [loading, setLoading] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/trends?keywords=${keywords}`);
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

  if (loading)
    return (
      <Layout>
        <div className="container py-5 text-center">Loading...</div>
      </Layout>
    );

  if (!data)
    return (
      <Layout>
        <div className="container py-5 text-center">No data</div>
      </Layout>
    );

  if (data.error)
    return (
      <Layout>
        <div className="container py-5 text-center text-danger">{data.error}</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="container py-5">
        <h1 className="text-center fw-bold mb-4 text-white">Trending Hours</h1>
        <p className="text-center text-muted mb-5">
          See the most active hours for your favorite platforms.
        </p>

        {/* Keywords input */}
        <div className="d-flex justify-content-center mb-5">
          <input
            type="text"
            className="form-control me-2"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter comma-separated keywords"
            style={{ maxWidth: "400px" }}
          />
          <button className="btn btn-primary" onClick={fetchTrends}>
            Fetch Trends
          </button>
        </div>

        <div className="row g-4">
          {Object.entries(data).map(([kw, hours]) => (
            <div key={kw} className="col-md-6 col-lg-4">
              <div
                className="card shadow-sm p-4 h-100 text-center"
                style={{ backgroundColor: "rgba(50, 50, 50, 0.7)", color: "white" }}
              >
                <FaChartLine size={40} className="mb-3 text-warning" />
                <h5 className="fw-bold">{kw}</h5>
                <ul className="list-unstyled mt-3 mb-0">
                  {hours.map((h, i) => (
                    <li key={i}>
                      {h}:00 – {(h + 1) % 24}:00
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Animated Background */}
      <div className="animated-bg">
        <div className="bg-slide slide1"></div>
        <div className="bg-slide slide2"></div>
        <div className="bg-slide slide3"></div>
      </div>

      <style jsx>{`
        .animated-bg {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: -1;
          overflow: hidden;
        }
        .bg-slide {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          animation: fadeBg 30s infinite;
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
          0% { opacity: 0; transform: scale(1); }
          10% { opacity: 1; transform: scale(1.05); }
          30% { opacity: 1; transform: scale(1.1); }
          40% { opacity: 0; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1); }
        }
      `}</style>
    </Layout>
  );
}
