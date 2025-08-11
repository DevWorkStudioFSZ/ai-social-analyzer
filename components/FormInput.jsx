// #D:\marketmate\frontend\components\FormInput.jsx
import { useState } from 'react';

export default function FormInput({ onSubmit }) {
  const [form, setForm] = useState({
  company_name: '',
  category: '',
  domain: '',
  scope: ''
});


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4 text-primary">
                <i className="fas fa-building me-2"></i>
                Company Analysis
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-user-tag me-2 text-primary"></i>
                    Company Name
                  </label>
                  <input
  className="form-control"
  name="company_name"  // ✅ updated
  onChange={handleChange}
  required
/>

                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-list me-2 text-primary"></i>
                    Category
                  </label>
                  <input
                    className="form-control"
                    name="category"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-globe me-2 text-primary"></i>
                    Domain
                  </label>
                  <input
                    className="form-control"
                    name="domain"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    <i className="fas fa-flag me-2 text-primary"></i>
                    Scope
                  </label>
                  <input
                    className="form-control"
                    name="scope"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Analyze Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
