
// D:\marketmate\frontend\components\ResultsCard.jsx
import { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaTiktok, FaLink } from 'react-icons/fa';

const platformIcons = {
  facebook: <FaFacebook />,
  twitter: <FaTwitter />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  linkedin: <FaLinkedin />,
  tiktok: <FaTiktok />,
};

export default function ResultsCard({ data }) {
  const {
    found_profiles,
    missing_platforms = [],
    recommendation = {},
    post_ideas = [],
    seo_blog = { title: '', meta: '', keywords: [] }
  } = data;

  const renderPlatformIcon = (platform) => platformIcons[platform.toLowerCase()] || <FaLink />;

  const [visibleSection, setVisibleSection] = useState('');

  const toggleSection = (section) => {
    setVisibleSection(prev => prev === section ? '' : section);
  };

  return (
    <div className="results-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-slide slide1"></div>
        <div className="bg-slide slide2"></div>
        <div className="bg-slide slide3"></div>
      </div>

      <div className="container my-5" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className="text-center text-secondary mb-4">Audit Results</h2>

        {/* Buttons to toggle each section */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
          <button className="btn toggle-btn" onClick={() => toggleSection('found')}>Found Profiles</button>
          <button className="btn toggle-btn" onClick={() => toggleSection('missing')}>Missing Platforms</button>
          <button className="btn toggle-btn" onClick={() => toggleSection('recommendation')}>Recommendations</button>
          <button className="btn toggle-btn" onClick={() => toggleSection('post')}>Post Ideas</button>
          <button className="btn toggle-btn" onClick={() => toggleSection('seo')}>SEO Blog</button>
        </div>

        {/* Card Sections */}
        {visibleSection === 'found' && (
          <div className="card results-card mb-4 shadow-sm">
            <div className="card-header">Found Profiles</div>
            <ul className="list-group list-group-flush">
              {Object.entries(found_profiles).map(([platform, url]) => (
                <li key={platform} className="list-group-item d-flex align-items-center justify-content-between">
                  <div>
                    {renderPlatformIcon(platform)}{' '}
                    <span className="text-capitalize fw-bold">{platform}</span>
                  </div>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm">
                    Visit
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {visibleSection === 'missing' && (
          <div className="card results-card mb-4 shadow-sm">
            <div className="card-header">Missing Platforms</div>
            <ul className="list-group list-group-flush">
              {missing_platforms.length > 0 ? (
                missing_platforms.map(p => (
                  <li key={p} className="list-group-item text-capitalize">
                    {renderPlatformIcon(p)} {p}
                  </li>
                ))
              ) : (
                <li className="list-group-item">All major platforms found.</li>
              )}
            </ul>
          </div>
        )}

        {visibleSection === 'recommendation' && (
          <div className="card results-card mb-4 shadow-sm">
            <div className="card-header">Recommendations</div>
            <ul className="list-group list-group-flush">
              {Object.entries(recommendation).map(([k, v]) => (
                <li key={k} className="list-group-item">
                  <b>{k}:</b> {v}
                </li>
              ))}
            </ul>
          </div>
        )}

        {visibleSection === 'post' && (
          <div className="card results-card mb-4 shadow-sm">
            <div className="card-header">Post Ideas</div>
            <ul className="list-group list-group-flush">
              {post_ideas.map((idea, i) => (
                <li key={i} className="list-group-item">{idea}</li>
              ))}
            </ul>
          </div>
        )}

        {visibleSection === 'seo' && (
          <div className="card results-card mb-4 shadow-sm">
            <div className="card-header">SEO Blog Suggestions</div>
            <div className="card-body">
              <p><b>Title:</b> {seo_blog.title}</p>
              <p><b>Meta Description:</b> {seo_blog.meta}</p>
              <p><b>Keywords:</b> <span className="badge bg-dark">{seo_blog.keywords.join(', ')}</span></p>
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <button className="btn btn-outline-dark" onClick={() => window.history.back()}>
            ← Back
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Toggle Buttons */
        .toggle-btn {
          background: rgba(80, 80, 80, 0.85);
          color: #fff;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.3s;
        }
        .toggle-btn:hover {
          background: rgba(50, 50, 50, 0.9);
          transform: scale(1.05);
        }

        /* Result Cards */
        .results-card {
          background: rgba(220, 220, 220, 0.9); /* light grey with opacity */
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .results-card:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .results-card .card-header {
          background: rgba(50, 50, 50, 0.85); /* dark grey opacity */
          color: #fff;
          font-weight: 600;
          border-radius: 12px 12px 0 0;
        }
        .results-card .list-group-item {
          background: rgba(245, 245, 245, 0.7);
          border: none;
        }

        /* Animated Background */
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
    </div>
  );
}
