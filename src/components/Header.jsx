import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "./images/bashkbano-logo.svg";
import { useGlobalState } from "../StateProvider";
import { auth } from "../firebase";
import MenuIcon from "@material-ui/icons/Menu";

function Header({ type }) {
  const [state, dispatch] = useGlobalState();
  let mobileViewNav = false;
  function logout() {
    if (state.user) {
      auth.signOut();
    }
  }

  return (
    <div className="header">
      <div>
        {/* {logo } */}
        <Link to="/">
          <img className="header__logo" src={Logo} alt="" />
        </Link>
        {/* {nav} */}
        <nav
          onClick={() => {
            document.querySelector(".header__nav").classList.toggle("active");
            mobileViewNav = false;
          }}
          className="header__nav"
        >
          <Link
            to="/rooms"
            className={`header__nav-link  ${type === "rooms" && "nav-active"}`}
          >
            Rooms
          </Link>
          <Link
            to="/"
            className={`header__nav-link  ${
              type === "roommates" && "nav-active"
            }`}
          >
            Roommates
          </Link>
          {!state.user ? (
            <Link
              to="/login"
              className={`header__nav-link  ${
                type === "login" && "nav-active"
              }`}
            >
              Login
            </Link>
          ) : (
            <Link
              to="/my-listings"
              className={`header__nav-link  ${
                type === "my-listings" && "nav-active"
              }`}
            >
              My listings
            </Link>
          )}
          {state.user && (
            <span onClick={logout} className="header__nav-link">
              Logout{" "}
            </span>
          )}
        </nav>
        <div
          onClick={() => {
            document.querySelector(".header__nav").classList.toggle("active");
            mobileViewNav = true;
          }}
          className="mobile-view-nav"
        >
          <MenuIcon />
        </div>
      </div>
    </div>
  );
}

export default Header;
