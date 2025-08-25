// pages/home.jsx
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import { FaBuilding, FaTags, FaGlobe, FaMapMarkerAlt, FaChartLine, FaBolt, FaBars } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
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
    setIsLoading(true); // Set loading to true on submission
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        alert("Analysis failed: " + err.detail);
        setIsLoading(false); // Set loading to false on error
        return;
      }

      const result = await response.json();

      router.push({
        pathname: "/results",
        query: { data: JSON.stringify(result) },
      });
    } catch (err) {
      alert("Failed to submit form");
      console.error(err);
    } finally {
      setIsLoading(false); // Set loading to false in finally block
    }
  };

  /* ------------------------- FORM VIEW ------------------------- */
  if (showForm) {
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
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: 40, height: 40, backgroundColor: "#0F62FE" }}
                      >
                        <FaChartLine className="text-white" />
                      </div>
                      <h4 className="mb-0">Company Analysis</h4>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-3">
                      {/* Company Name */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold d-flex align-items-center gap-2">
                          <FaBuilding /> Company Name
                        </label>
                        <input
                          id="company_name"
                          name="company_name"
                          placeholder="Enter company name"
                          value={formData.company_name}
                          onChange={handleChange}
                          className="form-control"
                          style={{
                            backgroundColor: "#243B66",
                            border: "1px solid #334A7D",
                            color: "#fff"
                          }}
                          required
                          disabled={isLoading} // Disable while loading
                        />
                      </div>

                      {/* Category */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold d-flex align-items-center gap-2">
                          <FaTags /> Category
                        </label>
                        <input
                          id="category"
                          name="category"
                          placeholder="Enter category (e.g., Retail, SaaS)"
                          value={formData.category}
                          onChange={handleChange}
                          className="form-control"
                          style={{
                            backgroundColor: "#243B66",
                            border: "1px solid #334A7D",
                             color: "#fff"
                          }}
                          required
                          disabled={isLoading} // Disable while loading
                        />
                      </div>

                      {/* Domain */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold d-flex align-items-center gap-2">
                          <FaGlobe /> Domain
                        </label>
                        <input
                          id="domain"
                          name="domain"
                          placeholder="example.com"
                          value={formData.domain}
                          onChange={handleChange}
                          className="form-control"
                          style={{
                            backgroundColor: "#243B66",
                            border: "1px solid #334A7D",
                             color: "#fff"
                          }}
                          required
                          disabled={isLoading} // Disable while loading
                        />
                      </div>

                      {/* Scope */}
                      <div className="mb-4">
                        <label className="form-label fw-semibold d-flex align-items-center gap-2">
                          <FaMapMarkerAlt /> Scope
                        </label>
                        <select
                          id="scope"
                          name="scope"
                          value={formData.scope}
                          onChange={handleChange}
                          className="form-select"
                          style={{
                            backgroundColor: "#243B66",
                            border: "1px solid #334A7D",
                             color: "#fff"
                          }}
                          required
                          disabled={isLoading} // Disable while loading
                        >
                          <option value="">Select Scope</option>
                          <option value="local">Local</option>
                          <option value="national">National</option>
                          <option value="global">Global</option>
                        </select>
                      </div>

                      <div className="d-flex gap-3">
                        <button
                          type="submit"
                          className="btn px-4"
                          style={{ backgroundColor: "#0F62FE", color: "#fff" }}
                          disabled={isLoading} // Disable while loading
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Running Audit...
                            </>
                          ) : (
                            "Run Audit"
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="btn btn-outline-light px-4"
                          disabled={isLoading} // Disable while loading
                        >
                          Back to Dashboard
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Quick helper text */}
                <p className="text-muted small text-center mt-3">
                  Tip: use your public domain (not staging) for best results.
                </p>
              </div>
            </div>
          </div>

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
          `}</style>
        </section>
      </Layout>
    );
  }

  /* ----------------------- DASHBOARD VIEW ---------------------- */
  return (
    <Layout>
      <section style={{ backgroundColor: "#e8ecf3ff", minHeight: "calc(100vh - 64px)" }}>
        {/* Sidebar Toggle Button (for small screens) */}
        <button
          className="btn btn-primary d-lg-none"
          onClick={() => setShowSidebar(!showSidebar)}
          style={{ position: "fixed", top: 70, left: 10, zIndex: 1000 }}
        >
          <FaBars />
        </button>

        <div className="d-flex flex-column flex-lg-row">
          {/* Sidebar */}
          <aside
            className={`p-4 text-white ${showSidebar ? 'd-block' : 'd-none d-lg-block'}`}
            style={{
              backgroundColor: "#0F2557",
              minHeight: "calc(100vh)",
              width: 260,
            }}
          >
            <ul className="list-unstyled mb-0">
              <li
                role="button"
                className="d-flex align-items-center gap-2 mb-3"
                onClick={() => setShowForm(true)}
              >
                <FaBolt color="#FFC107" /> Analyze Your Company
              </li>
              <li className="mb-3">
                <Link href="/competitors" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <FaChartLine color="#FFC107" /> Competitors
                </Link>
              </li>
              <li>
                <Link href="/utilities" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <FaGlobe color="#FFC107" /> Utilities
                </Link>
              </li>
            </ul>
          </aside>

          {/* Main */}
          <main className="flex-grow-1 d-flex align-items-center justify-content-center p-3">
            <div
              className="text-center p-5 border rounded-4 shadow-lg"
              style={{
                maxWidth: 840,
                backgroundColor: "#0F2557",
                color: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <h1 className="fw-bold display-6 mb-3">
                Welcome to <span style={{ color: "#FFC107" }}>AI MarketMate</span>
              </h1>
              <p className="lead mb-0 text-white-70 text-bold">
                Your smart companion for digital marketing.
              </p>

              {/* Decorative line */}
              <div
                className="mt-4 mx-auto"
                style={{
                  width: "80px",
                  height: "3px",
                  background: "linear-gradient(90deg, #FFC107, #FF5722)",
                  borderRadius: "2px",
                }}
              />
            </div>
          </main>
        </div>
      </section>
    </Layout>
  );
}
