import { useState } from 'react';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Validate confirm password
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    // Validate phone (optional)
    if (formData.phone && !/^\d{8}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 8-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

      if (validateForm()) {
          setFormSubmitted(true);
          const endpoint = 'http://127.0.0.1:8000/api-auth/register';
          try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const result = await response.json();
          console.log("Server response:", result);
        } catch (err) {
          console.error("Error sending data:", err);
        }
      };
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        {formSubmitted ? (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Registration Successful!
            </h2>
            <p className="mb-6 text-gray-600">
              Thank you for creating an account.
            </p>
            <button className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition duration-200 hover:bg-blue-700">
              Proceed to Login
            </button>
          </div>
        ) : (
          <>
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Create an Account
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1 block text-sm font-medium text-gray-600"
                >
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">{errors.username}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="mb-1 block text-sm font-medium text-gray-600"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="mb-1 block text-sm font-medium text-gray-600"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-600"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium text-gray-600"
                >
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  min={8}
                  max={8}
                  className={`w-full rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-600"
                >
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirm_password"
                  className="mb-1 block text-sm font-medium text-gray-600"
                >
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.confirm_password
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors.confirm_password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirm_password}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition duration-200 hover:bg-blue-700"
              >
                Create Account
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <a href= "login" className="cursor-pointer text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
