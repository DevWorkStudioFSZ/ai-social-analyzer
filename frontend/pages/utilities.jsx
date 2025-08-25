// pages/utilities.jsx
import { useState } from "react";
import Layout from "../components/Layout";
import { FaHashtag, FaBuilding, FaTags, FaUsers } from "react-icons/fa";

export default function GenerateCaption() {
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
      const res = await fetch(
        "http://127.0.0.1:8000/caption-hashtag/generate-caption-hashtags",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brand_name: brand,
            category,
            audience,
            tone: "engaging",
          }),
        }
      );

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
    <Layout>
      <section style={{ backgroundColor: "#e8ecf3ff", minHeight: "100vh" }} className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div
                className="card shadow-sm border-0 rounded-3"
                style={{ backgroundColor: "#1B2A49", color: "#fff" }}
              >
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: 40, height: 40, backgroundColor: "#0F62FE" }}
                    >
                      <FaHashtag className="text-white" />
                    </div>
                    <h4 className="mb-0">Generate Social Media Caption and Hashtags</h4>
                  </div>

                  {/* Form */}
                  <div className="mt-3">
                    {/* Brand */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold d-flex align-items-center gap-2">
                        <FaBuilding /> Brand Name
                      </label>
                      <input
                        placeholder="e.g., Acme Co."
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="form-control text-white"
                        style={{
                          backgroundColor: "#243B66",
                          border: "1px solid #334A7D",
                        }}
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold d-flex align-items-center gap-2">
                        <FaTags /> Category
                      </label>
                      <input
                        placeholder="e.g., Skincare, SaaS, Fitness"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-control text-white"
                        style={{
                          backgroundColor: "#243B66",
                          border: "1px solid #334A7D",
                        }}
                      />
                    </div>

                    {/* Audience */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold d-flex align-items-center gap-2">
                        <FaUsers /> Audience
                      </label>
                      <input
                        placeholder="e.g., Gen Z, Working Moms, Developers"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        className="form-control text-white"
                        style={{
                          backgroundColor: "#243B66",
                          border: "1px solid #334A7D",
                        }}
                      />
                    </div>

                    <div className="d-flex gap-3">
                      <button
                        className="btn px-4"
                        style={{ backgroundColor: "#0F62FE", color: "#fff" }}
                        onClick={handleGenerate}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Generating...
                          </>
                        ) : (
                          "Generate"
                        )}
                      </button>

                      <button
                        className="btn btn-outline-light px-4"
                        onClick={() => window.history.back()}
                        type="button"
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>

                  {/* Preview */}
                  {captionData && (
                    <div className="mt-4">
                      <div
                        className="card border-0 shadow-sm"
                        style={{ backgroundColor: "#243B66", color: "#fff" }}
                      >
                        <div className="card-body">
                          <h5 className="mb-2">Preview</h5>
                          <p className="mb-3">{captionData.caption}</p>

                          <div className="d-flex flex-wrap gap-2">
                            {captionData?.hashtags && captionData.hashtags.trim() !== "" ? (
                              captionData.hashtags.trim().split(/\s+/).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="hashtag-chip"
                                  title="Click to copy"
                                  onClick={() => navigator.clipboard.writeText(tag)}
                                >
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <div className="d-flex align-items-center text-muted small gap-2">
                                <FaHashtag className="text-secondary" />
                                <span>No hashtags generated</span>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  )}

                  {/* Helper text */}
                  <p className="text-muted small text-center mt-3 mb-0">
                    Tip: be specific with category & audience for better results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scoped styles */}
        <style jsx>{`
    ::placeholder {
      color: #aab4cc !important;
      opacity: 1;
    }
    .form-control:focus,
    .form-select:focus {
      border-color: #0f62fe;
      box-shadow: 0 0 0 0.25rem rgba(15, 98, 254, 0.25);
    }
    .hashtag-chip {
      background: #334a7d;
      color: #fff;
      padding: 0.3rem 0.6rem;
      border-radius: 999px;
      font-size: 0.9rem;
      cursor: pointer;
      border: 1px solid #4a5d91;
      transition: background 0.15s ease, transform 0.1s ease;
      user-select: none;
    }
    .hashtag-chip:hover {
      background: #0f62fe;
      transform: translateY(-1px);
    }
    .hashtag-chip:active {
      transform: translateY(0);
    }
  `}</style>
      </section>

    </Layout>
  );
}
