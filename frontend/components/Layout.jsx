import Navbar from "./Navbar";
import { House, InfoCircle, Telephone, Gear, BarChart, Lightbulb, Globe } from "react-bootstrap-icons";

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Main Body */}
      <main className="flex-grow-1">{children}</main>

      <footer
        className="pt-5 text-light"
        style={{ backgroundColor: "#0f2557ff" }}
      >
        <div className="container">
          <div className="row gy-4">

            {/* Brand Info */}
            <div className="col-lg-4 col-md-6">
              <h4 className="fw-bold mb-2" style={{ color: "#FFC107" }}>MarketMate</h4>
              <p className="small" style={{ color: "#F5F7FA" }}>
                AI-powered marketing assistant that audits your online presence,
                suggests improvements, and helps your brand grow smarter.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold mb-3" style={{ color: "#FFC107" }}>Quick Links</h6>
              <ul className="list-unstyled small">
                <li>
                  <a href="/home" className="text-light text-decoration-none hover-effect d-flex align-items-center gap-2">
                    <House size={16} /> Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-light text-decoration-none hover-effect d-flex align-items-center gap-2">
                    <InfoCircle size={16} /> About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-light text-decoration-none hover-effect d-flex align-items-center gap-2">
                    <Telephone size={16} /> Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="col-lg-3 col-md-6">
              <h6 className="fw-bold mb-3" style={{ color: "#FFC107" }}>Services</h6>
              <ul className="list-unstyled small">
                <li className="d-flex align-items-center gap-2"><Gear size={16} /> SEO Audit</li>
                <li className="d-flex align-items-center gap-2"><BarChart size={16} /> Social Stats</li>
                <li className="d-flex align-items-center gap-2"><Lightbulb size={16} /> Post Ideas</li>
                <li className="d-flex align-items-center gap-2"><Globe size={16} /> Recommendations</li>
              </ul>
            </div>

            {/* Language Toggle */}
            <div className="col-lg-3 col-md-6">
              <h6 className="fw-bold mb-3" style={{ color: "#FFC107" }}>Language</h6>
              <select
                className="form-select form-select-sm w-50 border-0"
                style={{ backgroundColor: "#1B2A4A", color: "#F5F7FA" }}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="text-center py-3 mt-4"
          style={{ backgroundColor: "#0B1A36" }}
        >
          <small>
            &copy; {new Date().getFullYear()}{" "}
            <span style={{ color: "#FFC107" }} className="fw-bold">MarketMate</span>. All Rights Reserved.
          </small>
        </div>

        {/* Extra Styling */}
        <style jsx>{`
    a.hover-effect:hover {
      color: #FFC107; /* Yellow hover */
      text-decoration: underline;
      transition: 0.3s;
    }
  `}</style>
      </footer>

    </div>
  );
}
