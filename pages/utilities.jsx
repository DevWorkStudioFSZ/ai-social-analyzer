import Link from "next/link";

import { useState } from "react";

export default function GenerateCaption({ onBack }) {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");
  const [captionData, setCaptionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!brand || !category || !audience) return alert("Fill all fields!");
    setLoading(true);
    setCaptionData(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/caption-hashtag/generate-caption-hashtags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: brand,
          category,
          audience,
          tone: "engaging"
        })
      });

      const data = await res.json();
      if (data.caption_hashtags) {
        setCaptionData(data.caption_hashtags);
      } else {
        alert("Failed to generate caption: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      {/* Background slides */}
      <div className="background-slides"></div>

      <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}>
        <div className="col-md-8 col-lg-6">
          <div className="card p-4 shadow" style={{ background: "rgba(0,0,0,0.7)", borderRadius: "12px" }}>
            <h2 className="text-center mb-4 text-white">Generate Social Media Caption</h2>

            <input
              placeholder="Brand Name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="form-control dark-card mb-3"
            />
            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control dark-card mb-3"
            />
            <input
              placeholder="Audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="form-control dark-card mb-3"
            />

            <button
              className="btn btn-primary w-100 mb-3"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Caption"}
            </button>

           {captionData && (
  <div className="post-preview mt-4">
    <div className="post-card p-3 shadow-sm">
      <h5 className="mb-2">Preview</h5>
      <p className="caption-text">{captionData.caption}</p>
      <div className="hashtags">
        {captionData.hashtags.split(" ").map((tag, idx) => (
          <span
  key={idx}
  className="hashtag"
  onClick={() => navigator.clipboard.writeText(tag)}
  title="Click to copy"
>
  {tag}
</span>

        ))}
      </div>
    </div>
  </div>
)}


          <button
  className="btn btn-outline-dark w-100"
  onClick={() => window.history.back()}
>
  Back to Dashboard
</button>

          </div>
        </div>
      </div>

      <style jsx>{`
        .dark-card {
          background: rgba(255,255,255,0.1);
          color: white;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          border: none;
        }

        .background-slides {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background-size: cover;
          background-position: center;
          animation: slideBackground 30s infinite;
        }
          .post-card {
  background: rgba(141, 128, 128, 0.85);
  border-radius: 12px;
  padding: 1rem;
  color: white;
  font-family: "Arial", sans-serif;
}

.caption-text {
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.hashtags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hashtag {
  background: rgba(255,255,255,0.2);
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.hashtag:hover {
  background: rgba(255,255,255,0.4);
}


        @keyframes slideBackground {
          0% { background-image: url("https://plus.unsplash.com/premium_photo-1685214580428-7eae1a78e7bc?q=80&w=1332&auto=format&fit=crop"); }
          33% { background-image: url("https://plus.unsplash.com/premium_photo-1683977922495-3ab3ce7ba4e6?q=80&w=1100&auto=format&fit=crop"); }
          66% { background-image: url("https://plus.unsplash.com/premium_photo-1711134826471-437ee57e8455?q=80&w=1112&auto=format&fit=crop"); }
          100% { background-image: url("https://plus.unsplash.com/premium_photo-1685214580428-7eae1a78e7bc?q=80&w=1332&auto=format&fit=crop"); }
        }
      `}</style>
    </div>
  );
}
