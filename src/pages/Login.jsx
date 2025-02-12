import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    axios
      .post("https://books-app-server-1.onrender.com/user/login", { username, password })
      .then((response) => {
        const { username } = response.data;
        console.log("Username:", username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.username);
        enqueueSnackbar("Login successful", { variant: "success" });
        navigate("/home", { state: { username } });
      })
      .catch((error) => {
        enqueueSnackbar("Login failed", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="bg-white p-5 rounded shadow-lg w-100"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="text-center text-primary mb-4">
          <i className="bi bi-lock"></i> Login
        </h1>
        <div className="mb-4">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        <button className="btn btn-primary w-100 py-2" onClick={handleLogin}>
          Login <i className="bi bi-box-arrow-in-right"></i>
        </button>
        <div className="mt-3 text-center">
          <p className="mb-0">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
