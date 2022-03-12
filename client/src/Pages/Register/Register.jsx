import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (username === "") {
      setError("Username is required!");
      return;
    }
    if (email === "") {
      setError("Email is required!");
      return;
    }
    setError("");
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");

      console.log(res);
    } catch {}
  };

  return (
    <div className="register">
      <div className="register__block">
        <span className="register__title">_omo</span>
        <form className="register__form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <label className="register__error-label">{error}</label>
          <button className="register__button">Sign up</button>
        </form>
        <button className="register__button">
          <Link className="link" to="/login">
            Sign in
          </Link>
        </button>
      </div>
    </div>
  );
}
