import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";

import "./topBar.css";

export default function TopBar() {
  const { dispatch, user } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <ul className="top-list">
          <li className="top-list__item top-bar__logo">
            <Link className="link" to="/">
              _omo
            </Link>
          </li>
          <li className="top-list__item">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="top-list__item">
            <Link className="link" to="/">
              About
            </Link>
          </li>
          {user && (
            <li className="top-list__item">
              <Link className="link" to="/write">
                Write
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="top-bar__center"></div>

      <div className="top-bar__right">
        <i className="top-bar__search-icon fa-solid fa-magnifying-glass" />
        {user ? (
          <>
            <Link className="link" to="/settings">
              <img
                className="top-bar__profile-img"
                src={PF + user.profilePicture}
                alt=""
              />
            </Link>
            <div className="top-bar__logout" onClick={handleLogout}>
              Logout
            </div>
          </>
        ) : (
          <ul className="top-list">
            <li className="top-list__item">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="top-list__item">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
