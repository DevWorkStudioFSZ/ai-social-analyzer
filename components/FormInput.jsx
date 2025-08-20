
import { useState } from "react";

export default function FormInput({ onSubmit }) {
  const [form, setForm] = useState({
    company_name: "",
    category: "",
    domain: "",
    scope: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
              <h3 className="card-title text-center mb-4 text-primary">Company Analysis</h3>
              <form onSubmit={handleSubmit}>
                <input
                  name="company_name"
                  placeholder="Company Name"
                  value={form.company_name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="category"
                  placeholder="Category"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
                <input
                  name="domain"
                  placeholder="Domain"
                  value={form.domain}
                  onChange={handleChange}
                  required
                />
                <select
                  name="scope"
                  value={form.scope}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Scope</option>
                  <option value="local">Local</option>
                  <option value="national">National</option>
                  <option value="global">Global</option>
                </select>
                <button type="submit">Run Audit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
