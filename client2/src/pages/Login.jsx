import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [toggle, setToggle] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate or send login request
    console.log('Login Data:', formData, 'Toggle:', toggle);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#273446] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered input-accent w-full bg-gray-900 text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered input-accent w-full bg-gray-900 text-white"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="flex items-center justify-between">
            <label className="label cursor-pointer text-white">
              <span className="label-text mr-2 text-white">Login as Professional</span>
              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={toggle}
                onChange={handleToggle}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-success w-full">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Don't have an account? <a href="/signup" className="text-green-400 hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
