// pages/contact.jsx
import Layout from "../components/Layout";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <Layout>
      {/* Header Section */}
      <section style={{ backgroundColor: "#e8ecf3ff", color: "#0F2557" }} className="py-5 text-center">
        <div className="container">
          <h1 className="fw-bold mb-3">Contact Us</h1>
          <p className="lead mb-0">Choose your preferred way to reach out. Our team will get back to you as soon as possible.</p>
        </div>
      </section>
      <section style={{ backgroundColor: "#e8ecf3ff" }}>
        <div className="container py-5">
          <div className="row justify-content-center g-4 mb-5">
            {/* Email */}
            <div className="col-md-4">
              <div
                className="card border-0 shadow-sm h-100 text-center card-hover"
                style={{ backgroundColor: "#0F2557", color: "#fff" }}
              >
                <div className="card-body p-4">
                  <FaEnvelope size={40} className="mb-3" color="#fff" />
                  <h5 className="fw-bold">Email</h5>
                  <p className="mb-0">support@marketmate.com</p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="col-md-4">
              <div
                className="card border-0 shadow-sm h-100 text-center card-hover"
                style={{ backgroundColor: "#0F2557", color: "#fff" }}
              >
                <div className="card-body p-4">
                  <FaWhatsapp size={40} className="mb-3" color="#fff" />
                  <h5 className="fw-bold">WhatsApp</h5>
                  <p className="mb-0">+92 311 390111</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="col-md-4">
              <div
                className="card border-0 shadow-sm h-100 text-center card-hover"
                style={{ backgroundColor: "#0F2557", color: "#fff" }}
              >
                <div className="card-body p-4">
                  <FaPhone size={40} className="mb-3" color="#fff" />
                  <h5 className="fw-bold">Phone</h5>
                  <p className="mb-0">+123 456 7890</p>
                </div>
              </div>
            </div>
          </div>
          <section style={{ backgroundColor: "#e8ecf3ff", color: "#0F2557" }} className="py-5 text-center">
            <div className="container">
              <h2 className="text-center fw-bold">Get in Touch</h2>
              <p className="text-center text-muted">
                We’re here to help you with support, inquiries, and feedback.
              </p>
            </div>
          </section>


          {/* Contact Form */}
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm p-4" style={{ backgroundColor: "#fff" }}>
                <h4 className="fw-bold mb-3 text-center" style={{ color: "#0F2557" }}>
                  Send Us a Message
                </h4>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Your Email" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="4" placeholder="Your Message" required></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-lg"
                      style={{ backgroundColor: "#0F2557", color: "#fff", border: "none" }}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Closing Mini CTA */}
      <section style={{ backgroundColor: "#e8ecf3ff", color: "#0F2557" }} className="py-5 text-center">
        <div className="container">
          <h4 className="fw-bold mb-3">Let’s start growing your brand today</h4>

          <button
            type="button"
            className="btn btn-lg"
            style={{ backgroundColor: "#0F2557", color: "#ffffff" }}
            onClick={() => (window.location.href = "/home")}
          >
            Start Free Audit
          </button>

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
