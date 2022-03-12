import { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";

import axios from "axios";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_ERROR" });
    }
  };

  console.log(user)
  return (
    <div className="login">
      <div className="login__block">
        <span className="login__title">_omo</span>
        <form className="login__form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" placeholder="Username" ref={userRef} />

          <label>Password</label>
          <input type="password" placeholder="Password" ref={passwordRef} />

          <button className="login__button">Sign in</button>
        </form>
        <button className="login__button">
          <Link className="link" to="/register">
            Sign up
          </Link>
        </button>
      </div>
    </div>
  );
}
