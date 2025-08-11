
// pages/index.jsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    brand_name: '',
    category: '',
    audience: '',
    scope: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.detail || 'Something went wrong');

      router.push({
        pathname: '/results',
        query: { data: JSON.stringify(result) },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit: ' + error.message);
    }
  };

  return (
    <Layout>
      <div className="container py-5">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-gradient">Boost Your Brand Online</h1>
          <p className="lead text-muted">Get personalized marketing audits, content ideas, and strategy – instantly.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">

            <FormCard
              label="Brand Name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder=" Canva, Nike"
              icon=""
            />

            <FormCard
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder=" Fashion, Tech"
              icon=""
            />

            <FormCard
              label="Domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              placeholder=" .com"
              icon=""
            />

            <FormCard
              label="Scope"
              name="scope"
              value={formData.scope}
              onChange={handleChange}
              placeholder="Choose"
              type="select"
              options={['Local', 'National', 'Global']}
              icon=""
            />
          </div>

          <div className="text-center mt-5">
            <button className="btn btn-lg btn-success px-5 py-2 shadow">
              Run Audit
            </button>
          </div>
        </form>

        {/* Optional Preview */}
        {formData.brand_name && (
          <div className="text-center mt-4 text-muted">
            <small>Auditing for <strong>{formData.brand_name}</strong> in <em>{formData.category}</em> targeting <em>{formData.audience}</em></small>
          </div>
        )}
      </div>
    </Layout>
  );
}

// ✅ Reusable Card Component
function FormCard({ label, name, value, onChange, placeholder, icon, type = "text", options = [] }) {
  return (
    <div className="col-md-6">
      <div className="card bg-light border border-secondary shadow-sm rounded-4">

        <div className="card-body">
          <label className="form-label fw-bold">{icon} {label}</label>
          {type === 'select' ? (
            <select
              className="form-select"
              name={name}
              value={value}
              onChange={onChange}
              required
            >
              <option value="">Select {label}</option>
              {options.map(opt => (
                <option key={opt} value={opt.toLowerCase()}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className="form-control"
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required
            />
          )}
        </div>
      </div>
    </div>
  );
}
