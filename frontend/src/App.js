import React, { useState } from "react";
import "./App.css";

const App = () => {
  // State for form values
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: false,
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field as user types
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Validation function for all fields
  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "This field is required";
    if (!form.lastName) newErrors.lastName = "This field is required";
    // Simple email regex for demonstration
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      newErrors.email = "Please enter a valid email address";
    if (!form.queryType) newErrors.queryType = "Please select a query type";
    if (!form.message) newErrors.message = "This field is required";
    if (!form.consent)
      newErrors.consent =
        "To submit this form, please consent to being contacted";
    setErrors(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // If valid, do something (e.g., send data)
      alert("Form submitted!");
    }
  };

  return (
    <div className="mainsection">
      <form className="sectiondiv" onSubmit={handleSubmit} noValidate>
        <h1 className="heading">Contact Us</h1>
        <div className="rowbased">
          <div className="columnbased">
            <label className="labeling">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              className={`inputstyling ${errors.firstName ? "error" : ""}`}
              value={form.firstName}
              onChange={handleChange}
            />
            {/* Show error message if exists */}
            {errors.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}
          </div>
          <div className="columnbased">
            <label className="labeling">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              className={`inputstyling ${errors.lastName ? "error" : ""}`}
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="emaildiv">
          <label className="labeling">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            className={`emailstyling ${errors.email ? "error" : ""}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="error-message">{errors.email}</div>
          )}
        </div>
        <div className="columnbased">
          <label className="labeling">
            Query Type *
          </label>
          <div className="radiostyling">
            <label className={`radio-option ${form.queryType === "general" ? "selected" : ""}`}>
              <input
                type="radio"
                name="queryType"
                value="general"
                checked={form.queryType === "general"}
                onChange={handleChange}
              />
              General Enquiry
            </label>
            <label className={`radio-option ${form.queryType === "support" ? "selected" : ""}`}>
              <input
                type="radio"
                name="queryType"
                value="support"
                checked={form.queryType === "support"}
                onChange={handleChange}
              />
              Support Request
            </label>
          </div>
          {errors.queryType && (
            <div className="error-message">{errors.queryType}</div>
          )}
        </div>
        <div className="emaildiv">
          <label className="labeling">
            Message *
          </label>
          <textarea
            name="message"
            className={`textareastyling ${errors.message ? "error" : ""}`}
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && (
            <div className="error-message">{errors.message}</div>
          )}
        </div>
        <div className="checkboxdiv">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            checked={form.consent}
            onChange={handleChange}
          />
          <label htmlFor="consent">
            I consent to being contacted by the team *
          </label>
        </div>
        {/* Show error for consent below checkbox */}
        {errors.consent && (
          <div className="error-message">{errors.consent}</div>
        )}
        <button className="but" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
