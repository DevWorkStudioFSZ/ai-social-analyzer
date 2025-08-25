// pages/results.jsx
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useState } from "react";
import {
  FaCheckCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
  FaLink,
  FaChartBar,
  FaUserCheck,
  FaUserTimes,
  FaLightbulb,
  FaPenFancy,
  FaSearch,
} from "react-icons/fa";

export default function ResultsPage() {
  const router = useRouter();
  const { data } = router.query;

  if (!data) return <p>Loading...</p>;

  const parsedData = JSON.parse(data);
  const {
    found_profiles,
    missing_platforms = [],
    recommendation = {},
    post_ideas = [],
    seo_blog = { title: "", meta: "", keywords: [] },
  } = parsedData;

  const platformIcons = {
    facebook: <FaFacebook color="#1877F2" />,
    twitter: <FaTwitter color="#1DA1F2" />,
    instagram: <FaInstagram color="#E4405F" />,
    youtube: <FaYoutube color="#FF0000" />,
    linkedin: <FaLinkedin color="#0A66C2" />,
    tiktok: <FaTiktok color="#000000" />,
  };

  const sectionConfig = {
    found: { label: "Found", icon: <FaUserCheck /> },
    missing: { label: "Missing", icon: <FaUserTimes /> },
    recommendation: { label: "Recommendations", icon: <FaLightbulb /> },
    post: { label: "Posts", icon: <FaPenFancy /> },
    seo: { label: "SEO", icon: <FaSearch /> },
  };

  const renderPlatformIcon = (platform) =>
    platformIcons[platform.toLowerCase()] || <FaLink color="#ccc" />;

  const [visibleSection, setVisibleSection] = useState("");

  const toggleSection = (section) =>
    setVisibleSection((prev) => (prev === section ? "" : section));

  return (
    <Layout>
      <div
        className="py-5 d-flex justify-content-center"
        style={{ backgroundColor: "#e8ecf3ff", minHeight: "100vh" }}
      >
        <div
          className="card shadow-lg border-0 p-4 text-center"
          style={{
            maxWidth: "750px",
            width: "100%",
            borderRadius: "18px",
            background: "#0F2557",
            color: "white",
          }}
        >
          {/* Header with Icon */}
          <div className="mb-4">
            
            <h2 className="fw-bold text-white">Analysis Results <FaCheckCircle size={28} className="text-success mb-2 text-white" /></h2>
            <p className="text-light">Here’s what we found for you...</p>
          </div>

          {/* Section Toggles */}
          <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
            {Object.entries(sectionConfig).map(([key, { label, icon }]) => (
              <button
                key={key}
                onClick={() => toggleSection(key)}
                className="btn d-flex align-items-center gap-2"
                style={{
                  backgroundColor:
                    visibleSection === key ? "#FFC107" : "#ffffff",
                  border: "1px solid #FFC107",
                  color: visibleSection === key ? "#0F2557" : "#0F2557",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontWeight: "500",
                }}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Found Profiles */}
          {visibleSection === "found" && (
            <div
              className="card shadow-sm border-0 mb-4"
              style={{ backgroundColor: "#1B2A49", borderRadius: "12px" }}
            >
              <div className="card-body text-white">
                <h5 className="fw-bold mb-3" >Found Profiles</h5>
                <ul className="list-unstyled">
                  {Object.entries(found_profiles).map(([platform, url]) => (
                    <li
                      key={platform}
                      className="d-flex justify-content-between align-items-center p-2 mb-2 rounded"
                      style={{ backgroundColor: "#2A3A5F" }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        {renderPlatformIcon(platform)}
                        <span className="text-capitalize">{platform}</span>
                      </div>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#FFC107", textDecoration: "none" }}
                      >
                        Visit
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Missing Platforms */}
          {visibleSection === "missing" && (
            <div
              className="card shadow-sm border-0 mb-4"
              style={{ backgroundColor: "#1B2A49", borderRadius: "12px" }}
            >
              <div className="card-body text-white">
                <h5 className="fw-bold mb-3">Missing Platforms</h5>
                {missing_platforms.length > 0 ? (
                  <ul className="list-unstyled">
                    {missing_platforms.map((p) => (
                      <li
                        key={p}
                        className="d-flex align-items-center gap-2 p-2 mb-2 rounded"
                        style={{ backgroundColor: "#2A3A5F" }}
                      >
                        {renderPlatformIcon(p)} {p}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>All major platforms found.</p>
                )}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {visibleSection === "recommendation" && (
            <div
              className="card shadow-sm border-0 mb-4"
              style={{ backgroundColor: "#1B2A49", borderRadius: "12px" }}
            >
              <div className="card-body text-white">
                <h5 className="fw-bold mb-3">Recommendations</h5>
                <ul className="list-unstyled">
                  {Object.entries(recommendation).map(([k, v]) => (
                    <li
                      key={k}
                      className="p-2 mb-2 rounded"
                      style={{ backgroundColor: "#2A3A5F" }}
                    >
                      <b>{k}:</b> {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Post Ideas */}
          {visibleSection === "post" && (
            <div
              className="card shadow-sm border-0 mb-4"
              style={{ backgroundColor: "#1B2A49", borderRadius: "12px" }}
            >
              <div className="card-body text-white">
                <h5 className="fw-bold mb-3">Post Ideas</h5>
                <ul className="list-unstyled">
                  {post_ideas.map((idea, i) => (
                    <li
                      key={i}
                      className="p-2 mb-2 rounded"
                      style={{ backgroundColor: "#2A3A5F" }}
                    >
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* SEO Blog */}
          {visibleSection === "seo" && (
            <div
              className="card shadow-sm border-0 mb-4"
              style={{ backgroundColor: "#1B2A49", borderRadius: "12px" }}
            >
              <div className="card-body text-white">
                <h5 className="fw-bold mb-3">SEO Blog Suggestions</h5>
                <div className="p-2 rounded" style={{ backgroundColor: "#2A3A5F" }}>
                  <p>
                    <b>Title:</b> {seo_blog.title}
                  </p>
                  <p>
                    <b>Meta:</b> {seo_blog.meta}
                  </p>
                  <p>
                    <b>Keywords:</b> {seo_blog.keywords.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="text-center mt-4">
            <button
              onClick={() => window.history.back()}
              className="btn"
              style={{
                backgroundColor: "#FFC107",
                color: "#0F2557",
                padding: "8px 20px",
                borderRadius: "8px",
                fontWeight: "600",
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
