import React, { useState } from "react";

const ContactUs = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!contactData.name) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email))
      newErrors.email = "Invalid email";
    if (!contactData.message) newErrors.message = "Message cannot be empty";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert("Message sent!");
      console.log(contactData);
      setContactData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-2xl bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={contactData.name}
              onChange={handleChange}
              className={`input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.name ? "input-error border-red-500" : ""
              }`}
            />
            {errors.name && (
              <span className="text-red-400 text-sm">{errors.name}</span>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={contactData.email}
              onChange={handleChange}
              className={`input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? "input-error border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-400 text-sm">{errors.email}</span>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={contactData.message}
              onChange={handleChange}
              className={`textarea textarea-bordered w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.message ? "textarea-error border-red-500" : ""
              }`}
            ></textarea>
            {errors.message && (
              <span className="text-red-400 text-sm">{errors.message}</span>
            )}
          </div>

          <button type="submit" className="btn btn-success w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
