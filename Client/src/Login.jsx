import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartPulse, Eye, EyeOff } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      // Send login request to the backend
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Handle response
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(errorData.error || "Invalid credentials!");
        setTimeout(() => {
          setError("");
        }, 3000);
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Store user data in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(data));

      // Get the user ID from the response data
      const userId = data.user.id;

      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Update user status and location
            try {
              const statusResponse = await fetch(
                `${BACKEND_URL}/api/userstatus/${userId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId,
                    isOnline: true,
                    latitude,
                    longitude,
                  }),
                }
              );

              if (!statusResponse.ok) {
                console.error("Failed to update user status and location");
              }
              const data = await statusResponse.json();
              console.log(data)
            } catch (error) {
              console.error("Error updating user status and location:", error);
            }

            // Continue with navigation after status update attempt
            console.log("Login successful");
            navigate("/dashboard");
          },
          (error) => {
            // If user denies location permission, still update status without location
            console.warn("Geolocation error:", error);
            updateUserStatusOnly(userId);
          },
          { timeout: 10000 }
        );
      } else {
        // Fallback if geolocation is not supported
        console.warn("Geolocation is not supported by this browser");
        updateUserStatusOnly(userId);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Helper function to update only the user status if location is unavailable
  const updateUserStatusOnly = async (userId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/userstatus/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          isOnline: true,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }

    // Continue with navigation
    console.log("Login successful");
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-red-50 to-red-100">
      <div className="w-full max-w-md">
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <HeartPulse className="mr-2 text-red-500" size={40} />
            <span className="text-2xl font-bold text-red-600">PlasmaCare</span>
          </div>
          <div className="space-x-2">
            <a
              href="/Login"
              className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Login
            </a>
            <a
              href="/Signup"
              className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Sign up
            </a>
          </div>
        </nav>

        {/* Login Form */}
        <div className="p-8 bg-white shadow-2xl rounded-xl">
          <div className="flex items-center mb-6">
            <HeartPulse className="mr-3 text-red-500" size={32} />
            <h2 className="text-3xl font-bold text-gray-800">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

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
                className="w-full px-4 py-2 pr-10 transition duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute text-gray-500 transition transform -translate-y-1/2 right-3 top-10 hover:text-red-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {error && (
              <div className="px-4 py-3 text-red-700 border border-red-300 rounded-lg bg-red-50">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <a href="#" className="text-sm text-red-600 hover:text-red-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-full py-3 space-x-2 text-white transition duration-300 transform bg-red-500 rounded-lg hover:bg-red-600 active:scale-95"
            >
              <span>Sign In</span>
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/Register"
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
