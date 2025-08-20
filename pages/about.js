



// pages/about.jsx
import Layout from "../components/Layout";
import { FaSearch, FaChartBar, FaLightbulb, FaBullhorn, FaUsers, FaGlobe } from "react-icons/fa";

export default function AboutPage() {
  return (
    <Layout>
      <div className="container py-5">
        <h1 className="text-center fw-bold mb-4">About MarketMate</h1>
        <p className="lead text-center text-muted mb-5">
          MarketMate is your AI-powered marketing assistant that helps you audit
          your online presence, suggest improvements, and grow your brand with smart strategies.
        </p>

        {/* Mission & Vision */}
        <div className="row mb-5">
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm p-4 h-100 bg-dark text-white">
              <h3 className="fw-bold"><FaGlobe className="me-2" />Our Mission</h3>
              <p>To empower businesses of all sizes with AI-driven marketing insights, helping them make smarter decisions, reach the right audience, and grow sustainably.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm p-4 h-100 bg-dark text-white">
              <h3 className="fw-bold"><FaUsers className="me-2" />Our Vision</h3>
              <p>To become the go-to AI assistant for digital marketing, trusted by brands worldwide to optimize their online presence.</p>
            </div>
          </div>
        </div>

        {/* Features / Services */}
        <h2 className="text-center fw-bold mb-4">Key Features</h2>
        <div className="row mb-5">
          <div className="col-md-3 mb-3">
            <div className="card shadow-sm p-4 h-100 bg-secondary text-white text-center">
              <FaSearch size={40} className="mb-2" />
              <h5 className="fw-bold">SEO Audit</h5>
              <p>Identify issues and opportunities to improve search rankings.</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow-sm p-4 h-100 bg-secondary text-white text-center">
              <FaChartBar size={40} className="mb-2" />
              <h5 className="fw-bold">Social Stats</h5>
              <p>Analyze social media presence across platforms.</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow-sm p-4 h-100 bg-secondary text-white text-center">
              <FaLightbulb size={40} className="mb-2" />
              <h5 className="fw-bold">Post Ideas</h5>
              <p>Generate engaging content ideas tailored to your audience.</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow-sm p-4 h-100 bg-secondary text-white text-center">
              <FaBullhorn size={40} className="mb-2" />
              <h5 className="fw-bold">Recommendations</h5>
              <p>Receive AI-powered marketing strategies to grow your brand.</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <h2 className="text-center fw-bold mb-4">How MarketMate Works</h2>
        <div className="row mb-5">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-4 h-100 bg-dark text-white text-center">
              <h5 className="fw-bold">Step 1</h5>
              <p>Enter your company details and domain.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-4 h-100 bg-dark text-white text-center">
              <h5 className="fw-bold">Step 2</h5>
              <p>MarketMate audits your online presence and generates insights.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-4 h-100 bg-dark text-white text-center">
              <h5 className="fw-bold">Step 3</h5>
              <p>Receive actionable recommendations and content ideas instantly.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center my-5">
          <a href="/home" className="btn btn-primary btn-lg">Start Your Audit</a>
        </div>
      </div>

      {/* Optional animated background */}
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
        .slide1 { background-image: url("https://plus.unsplash.com/premium_photo-1685214580428-7eae1a78e7bc?q=80&w=1332&auto=format&fit=crop"); animation-delay: 0s; }
        .slide2 { background-image: url("https://plus.unsplash.com/premium_photo-1683977922495-3ab3ce7ba4e6?q=80&w=1100&auto=format&fit=crop"); animation-delay: 10s; }
        .slide3 { background-image: url("https://plus.unsplash.com/premium_photo-1711134826471-437ee57e8455?q=80&w=1112&auto=format&fit=crop"); animation-delay: 20s; }
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
