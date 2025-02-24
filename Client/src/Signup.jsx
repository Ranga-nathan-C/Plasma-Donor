import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = "http://localhost:2100";
import "./App.css";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("9944123455");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (event) => {
      event.preventDefault();

    if (!name || !email || !password || !number) {
      setError("Please fill all the fields.");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError("Name should be in text format.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d+$/.test(number)) {
      setError("Please enter a valid number.");
      return;
    }

    if (!password.length >= 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    console.log("hi");
    try {
      const response = await fetch(`${BACKEND_URL}/Admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, number }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("response is: ", response);
        setError(data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
        throw new Error("Sign-up failed");
      }
      console.log(data)
      console.log("Sign-up successful");

      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/Home2");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };
  return (
    <>
      <div className="bg1 ">
        <nav
          className="navbar navbar-expand-md  navbar-Light "
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
                  href="/Home2"
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
        <div
          className="modal bg1  modal-sheet  position-static d-block "
          tabIndex="-1"
          role="dialog"
          id="modalSignin"
        >
          <div className="modal-dialog mb-5 pb-5" role="document">
            <div className="modal-content rounded-4   shadow">
              <div className="modal-header p-5 pb-4 border-bottom-0">
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

                <h1 className="fw-bold mb-0 fs-2">Sign up </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body p-5 pt-0">
                <form onSubmit={handlesubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control rounded-3"
                      id="floatingInput1"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control rounded-3"
                      id="floatingInput2"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput2">Email address</label>
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
                  <div className="form-check text-start mb-3 ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="remember-me"
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                    type="submit"
                  >
                    Sign up
                  </button>
                </form>
                {error && <p className="">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
