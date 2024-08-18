import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:2100";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.length >= 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/Admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Invalid credentials !");
        setTimeout(() => {
          setError("");
        }, 3000);
        throw new Error("Sign-in failed");
      }
      console.log(response)
      const data = await response.json();
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Sign-in successful");
      navigate("/Home2");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };
  return (
    <div className="container-fluid bg1">
      <div
        className="modal  modal-sheet position-static d-block "
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
                    className="bi mx-3 me-2 "
                    width="40"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="dark"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                  </svg>
                  <span className=" text-dark fs-4">PlasmaCare</span>
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
                <form className="col-md-3   text-end">
                  <a
                    href="/Login"
                    className="btn btn-primary btn-sm px-4 login  w-30 h-30 me-md-2   fw-bold"
                  >
                    Login
                  </a>
                  <a
                    href="/Signup"
                    className="btn btn-primary btn-sm px-4  w-30 h-30 me-md-2  fw-bold"
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
                className="bi mx-3 me-2 "
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
              <form className="" onSubmit={handlesubmit}>
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
                {error && <p className="text-red-500">{error}</p>}
                <p>
                  Don&apos;t have a account?{" "}
                  <a
                    href="/Signup"
                    className=" btn-light btn-sm sign  w-30 h-30 me-md-2  fw-bold"
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
                <hr className="my-4" />
                <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                <button
                  className="w-100 py-2  mb-2 btn btn-outline-secondary rounded-3"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter-x mx-2 "
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                  Sign in with Twitter
                </button>
                <button
                  className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-facebook mx-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                  </svg>
                  Sign in with Facebook
                </button>
                <button
                  className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github mx-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                  Sign in with GitHub
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
