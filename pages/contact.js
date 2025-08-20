
// pages/contact.jsx
import Layout from "../components/Layout";
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  return (
    <Layout>
      <div className="container py-5">
        <h1 className="text-center fw-bold mb-4">Contact Us</h1>
        <p className="text-center text-muted mb-5">
          We’d love to hear from you! Reach out for support, inquiries, or feedback.
        </p>

        <div className="row justify-content-center mb-5">
          
        {/* Email Card */}
<div className="col-md-4 mb-3">
  <div
    className="card shadow-sm p-4 h-100 text-center"
    style={{ backgroundColor: "rgba(211, 211, 211, 0.6)" }} // light gray with 60% opacity
  >
    <FaEnvelope size={40} className="mb-3 text-primary" />
    <h5 className="fw-bold">Email</h5>
    <p className="text">support@marketmate.com</p>
  </div>
</div>

{/* Phone Card */}
<div className="col-md-4 mb-3">
  <div
    className="card shadow-sm p-4 h-100 text-center"
    style={{ backgroundColor: "rgba(211, 211, 211, 0.6)" }} // light gray with 60% opacity
  >
    <FaPhone size={40} className="mb-3 text-success" />
    <h5 className="fw-bold">Phone</h5>
    <p className="text">+123 456 7890</p>
  </div>
</div>

        </div>
      </div>

      {/* Optional Animated Background */}
      <div className="animated-bg">
        <div className="bg-slide slide1"></div>
        <div className="bg-slide slide2"></div>
        <div className="bg-slide slide3"></div>
      </div>

      <style jsx>{`
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
    </Layout>
  );
}
