import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Main Body */}
      <main className="flex-grow-1">{children}</main>

      {/* Footer */}
<footer className="pt-5 mt-5" style={{ 
    background: "linear-gradient(180deg, #1a1a1a 0%, #2f2f2f 100%)", 
    color: "#fff" 
}}>
  <div className="container">
    <div className="row gy-4">
      {/* Brand Info */}
      <div className="col-lg-4 col-md-6">
        <h4 className="fw-bold mb-2">MarketMate</h4>
        <p className="small text-light">
          AI-powered marketing assistant that audits your online presence, suggests improvements, 
          and helps your brand grow smarter.
        </p>
      </div>

      {/* Quick Links */}
      <div className="col-lg-2 col-md-6">
        <h6 className="fw-bold mb-3">Quick Links</h6>
        <ul className="list-unstyled small">
          <li><a href="/home" className="text-light text-decoration-none hover-effect">Home</a></li>
          <li><a href="/about" className="text-light text-decoration-none hover-effect">About</a></li>
          <li><a href="/contact" className="text-light text-decoration-none hover-effect">Contact</a></li>
        </ul>
      </div>

      {/* Services */}
      <div className="col-lg-3 col-md-6">
        <h6 className="fw-bold mb-3">Services</h6>
        <ul className="list-unstyled small">
          <li>🔎 SEO Audit</li>
          <li>📊 Social Stats</li>
          <li>💡 Post Ideas</li>
          <li>📈 Recommendations</li>
        </ul>
      </div>

      {/* Language Toggle */}
      <div className="col-lg-3 col-md-6 d-flex flex-column">
        <h6 className="fw-bold mb-3">Language</h6>
        <select className="form-select form-select-sm w-50">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="text-center py-3 mt-4" style={{ backgroundColor: "#121212" }}>
    <small className="color:white">
      &copy; {new Date().getFullYear()} MarketMate. All Rights Reserved.
    </small>
  </div>

  <style jsx>{`
    a.hover-effect:hover {
      color: #0d6efd;
      text-decoration: underline;
      transition: 0.3s;
    }
    select.form-select {
      background-color: #333;
      color: #fff;
      border: none;
    }
    select.form-select:focus {
      box-shadow: 0 0 0 0.2rem rgba(13,110,253,.25);
      outline: none;
    }
  `}</style>
</footer>

    </div>
  );
}
