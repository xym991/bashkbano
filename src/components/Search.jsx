import React from "react";
import "./Search.css";
import RoomIcon from "@material-ui/icons/Room";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import { useGlobalState } from "../StateProvider";
import lodash from "lodash";
import TuneIcon from "@material-ui/icons/Tune";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import cities from "../ALMKXK";

function Search({ type }) {
  const [{ user, city }, dispatch] = useGlobalState();

  function setCity(e) {
    e.preventDefault();
    let city = document.getElementById("cityInput").value;
    document.getElementById("cityInput").value = "";
    dispatch({
      type: "CHANGE_CITY",
      city: city.toLowerCase(),
    });
  }

  function removeCity() {
    dispatch({
      type: "CHANGE_CITY",
      city: "",
    });
  }

  function expandSubItems(i, e) {
    if (Array.from(e.target.classList).includes("fli")) {
      e.target.childNodes[1]?.classList.toggle("expanded");
      console.log(e.target.parentNode);
      e.target.parentNode?.classList.toggle(`subitemsExpanded${i}`);
    }
  }

  function setFilter(e) {
    dispatch({
      type: "SET_FILTER",
      arr: e.target.value.split(","),
      filterType: type,
    });
    // e.target.onClick = removeFilter;
  }

  return (
    <div className="search">
      <div>
        <div className="heading">
          <h1>Find your ideal roommate now</h1>

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
          {city ? (
            <div className="citySearch">
              <h2>
                Looking for results in{" "}
                <span style={{ color: "#fec135" }}>
                  {lodash.capitalize(city)}{" "}
                </span>
                <span className="removeCity" onClick={removeCity}>
                  <CancelIcon />
                </span>
              </h2>

              {type == "rooms" && (
                <div className="filters">
                  <button
                    onClick={() =>
                      document
                        .querySelector(".filtersList")
                        .classList.toggle("height100")
                    }
                  >
                    Filters <TuneIcon />
                  </button>
                  <div className="filtersList">
                    <div
                      className="filtersListItem"
                      onClick={expandSubItems.bind(this, [8])}
                    >
                      <div className="fli">
                        Type <ExpandMoreIcon className="expandIcon" />
                      </div>
                      <div className="subItems">
                        <div className="filtersListSubItem">
                          Apartment{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["propertyType", "apartment", 1]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          Condo{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["propertyType", "condo", 1]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          House{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["propertyType", "house", 1]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          Townhouse{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["propertyType", "townhouse", 1]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          Basement{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["propertyType", "basement", 1]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          Loft{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["propertyType", "loft", 1]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          Studio{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["propertyType", "studio", 1]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          Trailer{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["propertyType", "trailer", 1]}
                          />{" "}
                        </div>{" "}
                      </div>
                    </div>
                    <div
                      className="filtersListItem"
                      onClick={expandSubItems.bind(this, [5])}
                    >
                      <div className="fli">
                        Gender preference
                        <ExpandMoreIcon className="expandIcon" />
                      </div>
                      <div className="subItems">
                        <div className="filtersListSubItem">
                          Any{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls1"
                            value={["preferredGender", "any", 2]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          Male{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls1"
                            value={["preferredGender", "male", 2]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          Female{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls1"
                            value={["preferredGender", "female", 2]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          Couples{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls1"
                            value={["preferredGender", "couples", 2]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          Either(no couples){" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls1"
                            value={["preferredGender", "either", 2]}
                          />{" "}
                        </div>{" "}
                      </div>
                    </div>
                    <div
                      className="filtersListItem"
                      onClick={expandSubItems.bind(this, [3])}
                    >
                      <div className="fli">
                        Furnishing
                        <ExpandMoreIcon className="expandIcon" />
                      </div>
                      <div className="subItems">
                        <div className="filtersListSubItem">
                          Furnished{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["furnished", "furnished", 3]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          Semi-furnished{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["furnished", "semi-furnished", 3]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          Unfurnished{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["furnished", "unfurnished", 3]}
                          />{" "}
                        </div>{" "}
                      </div>
                    </div>
                    <div
                      className="filtersListItem"
                      onClick={expandSubItems.bind(this, [4])}
                    >
                      <div className="fli">
                        Rooms
                        <ExpandMoreIcon className="expandIcon" />
                      </div>
                      <div className="subItems">
                        <div className="filtersListSubItem">
                          1-4{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["rooms", "1-4", 4]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          4-6{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["rooms", "4-6", 4]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          6-8{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["rooms", "6-8", 4]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          8+{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["rooms", "8-100", 4]}
                          />{" "}
                        </div>{" "}
                      </div>
                    </div>
                    <div
                      className="filtersListItem"
                      onClick={expandSubItems.bind(this, [4])}
                    >
                      <div className="fli">
                        bathooms
                        <ExpandMoreIcon className="expandIcon" />
                      </div>
                      <div className="subItems">
                        <div className="filtersListSubItem">
                          1-3{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["bathrooms", "1-3", 5]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          3-6{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["bathrooms", "3-6", 5]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          6+{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["bathrooms", "6-20", 5]}
                          />{" "}
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {type == "roommates" && (
                <div className="filters">
                  <button
                    onClick={() =>
                      document
                        .querySelector(".filtersList")
                        .classList.toggle("height100")
                    }
                  >
                    Filters <TuneIcon />
                  </button>
                  <div className="filtersList">
                    <div
                      className="filtersListItem"
                      onClick={expandSubItems.bind(this, [4])}
                    >
                      <div className="fli">
                        Age <ExpandMoreIcon className="expandIcon" />
                      </div>
                      <div className="subItems">
                        <div className="filtersListSubItem">
                          18 to 25{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["age", "18-25", 1]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          25 to 40{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["age", "25-40", 1]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          40 to 50{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["age", "40-50", 1]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          50+{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls"
                            value={["age", "50-120", 1]}
                          />{" "}
                        </div>{" "}
                      </div>
                    </div>
                    <div
                      className="filtersListItem"
                      onClick={expandSubItems.bind(this, [3])}
                    >
                      <div className="fli">
                        Gender
                        <ExpandMoreIcon className="expandIcon" />
                      </div>
                      <div className="subItems">
                        <div className="filtersListSubItem">
                          Male{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls1"
                            value={["gender", "male", 2]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          Female{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls1"
                            value={["gender", "female", 2]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          other{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls1"
                            value={["gender", "other", 2]}
                          />{" "}
                        </div>
                      </div>
                    </div>
                    <div
                      className="filtersListItem"
                      onClick={expandSubItems.bind(this, [3])}
                    >
                      <div className="fli">
                        Accomodation for
                        <ExpandMoreIcon className="expandIcon" />
                      </div>
                      <div className="subItems">
                        <div className="filtersListSubItem">
                          Couple{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["lookingFor", "couple", 3]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          Friends{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["lookingFor", "friends", 3]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          Single{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls2"
                            value={["lookingFor", "just me", 3]}
                          />{" "}
                        </div>{" "}
                      </div>
                    </div>
                    <div
                      className="filtersListItem"
                      onClick={expandSubItems.bind(this, [3])}
                    >
                      <div className="fli">
                        Children
                        <ExpandMoreIcon className="expandIcon" />
                      </div>
                      <div className="subItems">
                        <div className="filtersListSubItem">
                          None{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls3"
                            value={["children", "none", 4]}
                          />{" "}
                        </div>
                        <div className="filtersListSubItem">
                          Will visit{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls3"
                            value={["children", "visiting children", 4]}
                          />{" "}
                        </div>{" "}
                        <div className="filtersListSubItem">
                          will stay{" "}
                          <input
                            onClick={setFilter}
                            type="checkbox"
                            name="fls3"
                            value={["children", "children", 4]}
                          />{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={setCity} className="search-input">
              <RoomIcon />

              <input
                id="cityInput"
                type="text"
                name="si"
                list="cityInputs"
                placeholder="Enter a city, neighborhood or address"
              />
              <datalist id="cityInputs">
                {cities.map((item) => (
                  <option value={item} />
                ))}
              </datalist>
              <button className="search-submit" type="submit">
                <ArrowForwardIcon className="arrow-icon" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
