import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartPulse, Eye, EyeOff,Menu, X } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    try {
      // Send login request to backend
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Invalid credentials!");
        setTimeout(() => setError(""), 3000);
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("user", JSON.stringify(data));
      const userId = data.user.id;

      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            await updateUserStatus(userId, true, latitude, longitude);
            navigate("/dashboard");
          },
          (error) => {
            console.warn("Geolocation error:", error);
            updateUserStatus(userId, true);
            navigate("/dashboard");
          },
          { timeout: 10000 }
        );
      } else {
        updateUserStatus(userId, true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    }
  };

  const updateUserStatus = async (
    userId,
    isOnline,
    latitude = null,
    longitude = null
  ) => {
    try {
      const body = { userId, isOnline };
      if (latitude !== null && longitude !== null) {
        body.latitude = latitude;
        body.longitude = longitude;
      }

      const response = await fetch(`${BACKEND_URL}/api/userstatus/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-red-50 to-red-100">
      <div className="w-full max-w-md">
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-8 relative">
          {/* Left Logo */}
          <div className="flex items-center">
            <HeartPulse className="mr-2 text-red-500" size={40} />
            <span className="text-2xl font-bold text-red-600">PlasmaCare</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            <a
              href="/Login"
              className="px-4 py-2 text-sm font-medium text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Login
            </a>
            <a
              href="/Signup"
              className="px-4 py-2 text-sm font-medium text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Sign up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-red-500 focus:outline-none"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-16 right-0 bg-white rounded-lg shadow-lg w-40 py-2 flex flex-col space-y-2 md:hidden z-50">
              <a
                href="/Login"
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                Login
              </a>
              <a
                href="/Signup"
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                Sign up
              </a>
            </div>
          )}
        </nav>

        {/* Login Form */}
        <div className="p-8 bg-white shadow-2xl rounded-xl">
          <div className="flex items-center mb-6">
            <HeartPulse className="mr-3 text-red-500" size={32} />
            <h2 className="text-3xl font-bold text-gray-800">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 transition transform -translate-y-1/2 right-3 top-10 hover:text-red-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 text-xs text-red-700 bg-red-100 border border-red-300 rounded-lg">
                {error}
              </div>
            )}

            {/* Remember me / Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="remember-me" className="text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-red-600 hover:text-red-500">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="flex items-center justify-center w-full py-3 text-sm font-medium text-white transition bg-red-500 rounded-lg hover:bg-red-600 active:scale-95"
            >
              Sign In
            </button>

            {/* Sign up Link */}
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/Signup"
                className="font-medium text-red-600 hover:text-red-500"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
