import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    field: "",
    experience: "",
    isProfessional: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.address) newErrors.address = "Address is required";

    if (formData.isProfessional) {
      if (!formData.field) newErrors.field = "Field is required";
      if (!formData.experience) newErrors.experience = "Experience is required";
    }

    return newErrors;
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Signup successful!");
      console.log(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 py-8">
      <div className="bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields */}
          {[
            { name: "username", label: "Username" },
            { name: "fullName", label: "Full Name" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
            { name: "phone", label: "Phone" },
            { name: "address", label: "Address" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleSignupChange}
                placeholder={label}
                className={`input input-bordered w-full text-white bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors[name] ? "input-error border-red-500" : ""
                }`}
              />
              {errors[name] && (
                <span className="text-red-400 text-sm">{errors[name]}</span>
              )}
            </div>
          ))}

          {/* Professional Fields */}
          {formData.isProfessional && (
            <>
              <div>
                <input
                  type="text"
                  name="field"
                  placeholder="Field"
                  value={formData.field}
                  onChange={handleSignupChange}
                  className={`input input-bordered w-full text-white bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.field ? "input-error border-red-500" : ""
                  }`}
                />
                {errors.field && (
                  <span className="text-red-400 text-sm">{errors.field}</span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience"
                  value={formData.experience}
                  onChange={handleSignupChange}
                  className={`input input-bordered w-full text-white bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.experience ? "input-error border-red-500" : ""
                  }`}
                />
                {errors.experience && (
                  <span className="text-red-400 text-sm">{errors.experience}</span>
                )}
              </div>
            </>
          )}

          {/* Toggle */}
          <div className="flex items-center justify-between">
            <label className="label cursor-pointer text-white">
              <span className="label-text text-white font-semibold">
                Signup as Professional
              </span>
            </label>
            <input
              type="checkbox"
              className="toggle toggle-success"
              name="isProfessional"
              checked={formData.isProfessional}
              onChange={handleSignupChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
