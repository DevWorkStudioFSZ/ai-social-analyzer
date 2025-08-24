// pages/about.jsx
import Layout from "../components/Layout";
import { 
  FaSearch, 
  FaChartBar, 
  FaLightbulb, 
  FaBullhorn, 
  FaUsers, 
  FaGlobe, 
  FaRocket, 
  FaClipboardList, 
  FaCheckCircle 
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <Layout>

      <section style={{ backgroundColor: "#e8ecf3ff" }}>
        <div className="container py-5">
          {/* About Intro */}
          <h1 className="text-center fw-bold mb-3">About MarketMate</h1>
          <p className="lead text-center text-muted mb-5">
            MarketMate is your AI-powered marketing assistant that helps you audit
            your online presence, suggest improvements, and grow your brand with smart strategies.
          </p>

          {/* Mission & Vision */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100 card-hover" style={{ backgroundColor: "#0F2557" }}>
                <div className="card-body p-4 text-white">
                  <h3 className="fw-bold d-flex align-items-center gap-2 mb-2 text-white">
                    <FaGlobe /> Our Mission
                  </h3>
                  <p className="mb-0">
                    Empower businesses with AI-driven insights to make smarter decisions,
                    reach the right audience, and grow sustainably.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100 card-hover" style={{ backgroundColor: "#0F2557" }}>
                <div className="card-body p-4 text-white">
                  <h3 className="fw-bold d-flex align-items-center gap-2 mb-2 text-white">
                    <FaUsers /> Our Vision
                  </h3>
                  <p className="mb-0">
                    Become the go-to AI assistant for digital marketing, trusted worldwide
                    to optimize online presence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <h2 className="text-center fw-bold mb-4">Key Features</h2>
          <div className="row g-4 mb-5">
            {[
              { icon: <FaSearch size={32} />, title: "SEO Audit", text: "Identify issues and opportunities to improve search rankings." },
              { icon: <FaChartBar size={32} />, title: "Social Stats", text: "Analyze social media presence across platforms." },
              { icon: <FaLightbulb size={32} />, title: "Post Ideas", text: "Generate engaging content ideas tailored to your audience." },
              { icon: <FaBullhorn size={32} />, title: "Recommendations", text: "Receive AI-powered strategies to grow your brand." },
            ].map((f, i) => (
              <div className="col-md-3" key={i}>
                <div className="card border-0 shadow-sm h-100 text-center card-hover" style={{ backgroundColor: "#0F2557" }}>
                  <div className="card-body p-4 text-white">
                    <div className="mb-2 text-white">{f.icon}</div>
                    <h5 className="fw-semibold text-white">{f.title}</h5>
                    <p className="mb-0">{f.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <h2 className="text-center fw-bold mb-4">How MarketMate Works</h2>
          <div className="row g-4 mb-5">
            {[
              { step: "Step 1", text: "Enter your company details and domain.", icon: <FaClipboardList /> },
              { step: "Step 2", text: "MarketMate audits your online presence and generates insights.", icon: <FaRocket /> },
              { step: "Step 3", text: "Receive actionable recommendations and content ideas instantly.", icon: <FaCheckCircle /> },
            ].map((s, i) => (
              <div className="col-md-4" key={i}>
                <div className="card border-0 shadow-sm h-100 text-center card-hover" style={{ backgroundColor: "#0F2557" }}>
                  <div className="card-body p-4 text-white">
                    <div className="mb-3 fs-3">{s.icon}</div>
                    <h5 className="fw-bold text-white">{s.step}</h5>
                    <p className="mb-0">{s.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center my-5">
            <a
              href="/home"
              className="btn btn-lg me-3"
              style={{ backgroundColor: "#0F2557", color: "#fff", border: "none" }}
            >
              Start Your Audit
            </a>
            <a
              href="/about"
              className="btn btn-lg"
              style={{ backgroundColor: "#fff", color: "#0F2557", border: "2px solid #0F2557" }}
            >
              Learn More
            </a>
            <p className="text-muted mt-3">No credit card required. Free trial available.</p>
          </div>
        </div>
      </section>
      {/* Hover effect style */}
      <style jsx>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Layout>
  );
}
