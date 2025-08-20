// D:\marketmate\frontend\pages\home.jsx
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";

export default function HomePage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false); // toggle dashboard <-> form
  const [formData, setFormData] = useState({
    company_name: "",
    category: "",
    domain: "",
    scope: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        alert("Analysis failed: " + err.detail);
        return;
      }

      const result = await response.json();
      console.log("Analysis result:", result);

      // Navigate to results page with JSON data
      router.push({
        pathname: "/results",
        query: { data: JSON.stringify(result) },
      });
    } catch (err) {
      alert("Failed to submit form");
      console.error(err);
    }
  };

  // ✅ Show FORM if true
  if (showForm) {
    return (
      <Layout>
        <div
          className="d-flex justify-content-center align-items-center py-5"
          style={{ minHeight: "100vh", position: "relative" }}
        >
          {/* Animated Background */}
          <div className="animated-bg">
            <div className="bg-slide slide1"></div>
            <div className="bg-slide slide2"></div>
            <div className="bg-slide slide3"></div>
          </div>

          {/* Cards Container */}
          <div
            className="d-grid gap-4"
            style={{ gridTemplateColumns: "1fr 1fr", zIndex: 1, width: "800px" }}
          >
            {/* Company Name Card */}
            <div
              className="card p-3 shadow-lg text-white bg-card"
              onClick={() => document.getElementById("company_name").focus()}
            >
              <label className="fw-bold mb-1">Company Name</label>
              <input
                id="company_name"
                name="company_name"
                placeholder="Enter company name"
                value={formData.company_name}
                onChange={handleChange}
                className="form-control bg-dark text-white border-0"
                required
              />
            </div>

            {/* Category Card */}
            <div
              className="card p-3 shadow-lg text-white bg-card"
              onClick={() => document.getElementById("category").focus()}
            >
              <label className="fw-bold mb-1">Category</label>
              <input
                id="category"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
                className="form-control bg-dark text-white border-0"
                required
              />
            </div>

            {/* Domain Card */}
            <div
              className="card p-3 shadow-lg text-white bg-card"
              onClick={() => document.getElementById("domain").focus()}
            >
              <label className="fw-bold mb-1">Domain</label>
              <input
                id="domain"
                name="domain"
                placeholder="Enter domain"
                value={formData.domain}
                onChange={handleChange}
                className="form-control bg-dark text-white border-0"
                required
              />
            </div>

            {/* Scope Card */}
            <div
              className="card p-3 shadow-lg text-white bg-card"
              onClick={() => document.getElementById("scope").focus()}
            >
              <label className="fw-bold mb-1">Scope</label>
              <select
                id="scope"
                name="scope"
                value={formData.scope}
                onChange={handleChange}
                className="form-control bg-dark text-white border-0"
                required
              >
                <option value="">Select Scope</option>
                <option value="local">Local</option>
                <option value="national">National</option>
                <option value="global">Global</option>
              </select>
            </div>

            {/* Buttons */}
            <div
              className="d-flex justify-content-center gap-3 mt-4"
              style={{ gridColumn: "1 / -1" }}
            >
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
                style={{ width: "150px" }}
              >
                Run Audit
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
                style={{ width: "150px" }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            overflow: hidden;
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
          .bg-card {
            background-color: rgba(0, 0, 0, 0.75);
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .bg-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
          }
        `}</style>
      </Layout>
    );
  }

  // ✅ Otherwise, show DASHBOARD
  return (
    <Layout>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <div
          className="p-4 text-white"
          style={{
            backgroundColor: "rgba(0,0,0,0.75)",
            minHeight: "100vh",
            width: "250px",
          }}
        >
          <ul className="list-unstyled">
            <li style={{ cursor: "pointer" }} onClick={() => setShowForm(true)}>
              Analyze Your Company
            </li>
            <li>
              <Link href="/competitors" className="text-white text-decoration-none">
                Competitors
              </Link>
            </li>
            <li>
              <Link href="/utilities" className="text-white text-decoration-none">
                Utilities
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Dashboard */}
        <div className="flex-grow-1 d-flex align-items-center justify-content-center position-relative">
          <div className="text-center p-5 rounded shadow-lg bg-dark bg-opacity-75 text-white">
            <h1 className="fw-bold display-5">Welcome to AI MarketMate</h1>
            <p className="lead">Your smart companion for digital marketing</p>
          </div>
          <div className="animated-bg"></div>
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
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          overflow: hidden;
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
      `}</style>
    </Layout>
  );
}
