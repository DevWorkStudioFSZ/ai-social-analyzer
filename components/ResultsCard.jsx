
// import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaTiktok, FaLink } from 'react-icons/fa';

// const platformIcons = {
//   facebook: <FaFacebook />,
//   twitter: <FaTwitter />,
//   instagram: <FaInstagram />,
//   youtube: <FaYoutube />,
//   linkedin: <FaLinkedin />,
//   tiktok: <FaTiktok />,
// };

// export default function ResultsCard({ data }) {
//   const {
//     found_profiles,
//     missing_platforms = [],
//     recommendation = {},
//     post_ideas = [],
//     seo_blog = { title: '', meta: '', keywords: [] }
//   } = data;

//   const renderPlatformIcon = (platform) => platformIcons[platform.toLowerCase()] || <FaLink />;

//   return (
//     <div className="container my-5">
//       <h2 className="text-center text-primary mb-5">Social Media Audit Results</h2>

//       {/* Found Profiles */}
//       <div className="card mb-4 shadow-sm">
//         <div className="card-header bg-success text-white">Found Profiles</div>
//         <ul className="list-group list-group-flush">
//           {Object.entries(found_profiles).map(([platform, url]) => (
//             <li key={platform} className="list-group-item d-flex align-items-center justify-content-between">
//               <div>
//                 {renderPlatformIcon(platform)}{' '}
//                 <span className="text-capitalize fw-bold">{platform}</span>
//               </div>
//               <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
//                 Visit
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Missing Platforms */}
//       <div className="card mb-4 shadow-sm">
//         <div className="card-header bg-danger text-white">Missing Platforms</div>
//         <ul className="list-group list-group-flush">
//           {missing_platforms.length > 0 ? (
//             missing_platforms.map(p => (
//               <li key={p} className="list-group-item text-capitalize">
//                 {renderPlatformIcon(p)} {p}
//               </li>
//             ))
//           ) : (
//             <li className="list-group-item">All major platforms found.</li>
//           )}
//         </ul>
//       </div>

//       {/* Recommendations */}
//       <div className="card mb-4 shadow-sm">
//         <div className="card-header bg-info text-white">Recommendations</div>
//         <ul className="list-group list-group-flush">
//           {Object.entries(recommendation).map(([k, v]) => (
//             <li key={k} className="list-group-item">
//               <b>{k}:</b> {v}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Post Ideas */}
//       <div className="card mb-4 shadow-sm">
//         <div className="card-header bg-warning text-dark">Post Ideas</div>
//         <ul className="list-group list-group-flush">
//           {post_ideas.map((idea, i) => (
//             <li key={i} className="list-group-item">{idea}</li>
//           ))}
//         </ul>
//       </div>

//       {/* SEO Blog */}
//       <div className="card mb-4 shadow-sm">
//         <div className="card-header bg-secondary text-white">SEO Blog Suggestions</div>
//         <div className="card-body">
//           <p><b>Title:</b> {seo_blog.title}</p>
//           <p><b>Meta Description:</b> {seo_blog.meta}</p>
//           <p><b>Keywords:</b> <span className="badge bg-dark">{seo_blog.keywords.join(', ')}</span></p>
//         </div>
//       </div>

//       <div className="text-center mt-5">
//         <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>
//           ← Go Back
//         </button>
//       </div>
//     </div>
//   );
// }




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

  // ✅ State toggles
  const [visibleSection, setVisibleSection] = useState('');

  const toggleSection = (section) => {
    setVisibleSection(prev => prev === section ? '' : section);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">Audit Results</h2>

      {/* Buttons to toggle each section */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        <button className="btn btn-outline-success" onClick={() => toggleSection('found')}>Found Profiles</button>
        <button className="btn btn-outline-danger" onClick={() => toggleSection('missing')}>Missing Platforms</button>
        <button className="btn btn-outline-info" onClick={() => toggleSection('recommendation')}>Recommendations</button>
        <button className="btn btn-outline-warning" onClick={() => toggleSection('post')}>Post Ideas</button>
        <button className="btn btn-outline-secondary" onClick={() => toggleSection('seo')}>SEO Blog</button>
      </div>

      {/* Found Profiles */}
      {visibleSection === 'found' && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-success text-white">Found Profiles</div>
          <ul className="list-group list-group-flush">
            {Object.entries(found_profiles).map(([platform, url]) => (
              <li key={platform} className="list-group-item d-flex align-items-center justify-content-between">
                <div>
                  {renderPlatformIcon(platform)}{' '}
                  <span className="text-capitalize fw-bold">{platform}</span>
                </div>
                <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                  Visit
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing Platforms */}
      {visibleSection === 'missing' && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-danger text-white">Missing Platforms</div>
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

      {/* Recommendations */}
      {visibleSection === 'recommendation' && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-info text-white">Recommendations</div>
          <ul className="list-group list-group-flush">
            {Object.entries(recommendation).map(([k, v]) => (
              <li key={k} className="list-group-item">
                <b>{k}:</b> {v}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Post Ideas */}
      {visibleSection === 'post' && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-warning text-dark">Post Ideas</div>
          <ul className="list-group list-group-flush">
            {post_ideas.map((idea, i) => (
              <li key={i} className="list-group-item">{idea}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SEO Blog */}
      {visibleSection === 'seo' && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-secondary text-white">SEO Blog Suggestions</div>
          <div className="card-body">
            <p><b>Title:</b> {seo_blog.title}</p>
            <p><b>Meta Description:</b> {seo_blog.meta}</p>
            <p><b>Keywords:</b> <span className="badge bg-dark">{seo_blog.keywords.join(', ')}</span></p>
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>
    </div>
  );
}
