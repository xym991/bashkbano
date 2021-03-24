import React from "react";
import "./Search.css";
import RoomIcon from "@material-ui/icons/Room";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
import { useGlobalState } from "../StateProvider";

function Search() {
  const [{ user }, dispatch] = useGlobalState();

  return (
    <div className="search">
      <div>
        <div className="heading">
          <h1>Find your ideal roommate now</h1>
          <form className="search-input">
            <RoomIcon />
            <input
              type="text"
              placeholder="Enter a city, neighborhood or address"
            />
            <button className="search-submit" type="submit">
              <ArrowForwardIcon className="arrow-icon" />
            </button>
          </form>
          {!user && (
            <div className="Login">
              <h3>
                {/* <Link to="/login">
                  <span className="login-span">Login</span>
                </Link>{" "} */}
                Login now to list your room
              </h3>
              <div>
                <Link to="/login">
                  {" "}
                  <button className="login-btn">Login</button>
                </Link>
                <Link to="/signup">
                  {" "}
                  <button className="sign-up-btn">Sign up</button>
                </Link>
              </div>
            </div>
          )}
          {user && (
            <div className="Login">
              <h3>List your room now</h3>
              <div>
                <Link to="/list-room">
                  {" "}
                  <button className="login-btn lg">List Room </button>
                </Link>
                <Link to="/list-roommate">
                  {" "}
                  <button className="sign-up-btn lg"> List Roommate</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
