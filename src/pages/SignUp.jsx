import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BsFillPersonFill, BsEnvelopeFill, BsLockFill } from "react-icons/bs"; // Bootstrap icons

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = () => {
    axios
      .post("https://books-app-server-1.onrender.com/user/signup", { username, email, password })
      .then(() => {
        enqueueSnackbar("Sign Up successful", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        enqueueSnackbar("Sign Up failed", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
      <h1 className="text-center text-primary mb-4">
          <i className="bi bi-lock"></i> Sign Up
        </h1>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <div className="input-group">
            <span className="input-group-text">
              <BsFillPersonFill />
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <BsEnvelopeFill />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <BsLockFill />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <button className="btn btn-primary w-100 mb-3" onClick={handleSignUp}>
          Sign Up
        </button>

        <div className="text-center">
          <p className="text-muted">
            Already have an account?{" "}
            <Link to="/" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
