import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      // Store token and user data in localStorage
      sessionStorage.setItem("user", JSON.stringify(data));
      console.log("Login successful");
      navigate("/dashboard"); // Redirect to the home page
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container-fluid bg1">
      <div
        className="modal modal-sheet position-static d-block"
        tabIndex="-1"
        role="dialog"
        id="modalSignin"
      >
        <div>
          <nav
            className="navbar navbar-expand-md navbar-Light"
            aria-label="Fourth navbar example"
          >
            <div className="container-fluid">
              <div className="col-md-3 mb-2 mb-md-0">
                <a
                  href="/"
                  className="d-inline-flex link-body-emphasis text-decoration-none"
                >
                  <svg
                    className="bi mx-3 me-2"
                    width="40"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="dark"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                  </svg>
                  <span className="text-dark fs-4">PlasmaCare</span>
                </a>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarsExample04"
                aria-controls="navbarsExample04"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarsExample04">
                <ul className="navbar-nav me-auto mb-2 mb-md-0"></ul>
                <form className="col-md-3 text-end">
                  <a
                    href="/Login"
                    className="btn btn-primary btn-sm px-4 login w-30 h-30 me-md-2 fw-bold"
                  >
                    Login
                  </a>
                  <a
                    href="/Signup"
                    className="btn btn-primary btn-sm px-4 w-30 h-30 me-md-2 fw-bold"
                  >
                    Sign up
                  </a>
                </form>
              </div>
            </div>
          </nav>
        </div>
        <div className="modal-dialog" role="document">
          <div className="modal-content mt-1 rounded-4 shadow">
            <div className="modal-header p-4 pb-4 border-bottom-0">
              <svg
                className="bi mx-3 me-2"
                width="40"
                height="32"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
              </svg>
              <h1 className="fw-bold mb-0 fs-2">Login</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body p-5 pt-0">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control rounded-3"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <p>
                  Don&apos;t have an account?{" "}
                  <a
                    href="/Register"
                    className="btn-light btn-sm sign w-30 h-30 me-md-2 fw-bold"
                  >
                    Sign up
                  </a>
                </p>
                <button
                  className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
