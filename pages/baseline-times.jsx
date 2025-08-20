
// pages/baseline-times.jsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaClock } from "react-icons/fa";

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

  if (loading) {
    return (
      <Layout>
        <div className="container py-5 text-center">Loading baseline times...</div>
      </Layout>
    );
  }

  if (data?.error) {
    return (
      <Layout>
        <div className="container py-5 text-center text-danger">{data.error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-5">
        <h1 className="text-center fw-bold mb-4 text-black">Baseline Posting Times</h1>
        <p className="text-center text-muted mb-5">
          Recommended posting times per platform based on engagement data.
        </p>

        <div className="row g-4">
          {data?.times &&
            Object.entries(data.times).map(([platform, times]) => (
              <div key={platform} className="col-md-6 col-lg-4">
                <div
                  className="card shadow-sm p-4 h-100 text-center"
                  style={{ backgroundColor: "rgba(50, 50, 50, 0.7)", color: "white" }}
                >
                  <FaClock size={40} className="mb-3 text-info" />
                  <h5 className="fw-bold">{platform}</h5>
                  <ul className="list-unstyled mt-3 mb-3">
                    {times?.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                  {data?.sources?.[platform] && (
                    <p className="text-white small">
                      Sources: {data.sources[platform].join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Animated Background */}
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
