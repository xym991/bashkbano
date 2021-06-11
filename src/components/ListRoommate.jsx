import React, { useState, useEffect } from "react";
import { useGlobalState } from "../StateProvider";
import "./TagBox.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { db, storage } from "../firebase";
import { useHistory } from "react-router-dom";
import lodash from "lodash";
import cities from "../ALMKXK";

function ListRoommate() {
  const [{ user }, dispatch] = useGlobalState();
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    locations: [],
    lookingFor: "just me",
    age: "",
    gender: "male",
    budget: "0",
    movingDate: "",
    currency: "€‎",

    children: "none",
    roommateDescription: "",
    cc: "+383",
    phone: null,
    image: "",
    city: "",
    name: "",

    tags: [],
  });

  const [done, setDone] = useState(false);
  function handleChange(e) {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function removeLocation(e) {
    console.log("clicked");
    const index = e.target.parentNode.classList[0];
    console.log(index);
    setState({
      ...state,
      locations: [
        ...state.locations.filter((item, i) => {
          if (i != index) {
            return true;
          } else return false;
        }),
      ],
    });
  }

  function addLocation(e) {
    e.preventDefault();
    if (e.target.parentNode.childNodes[0].value) {
      setState({
        ...state,
        locations: state.locations.concat([
          e.target.parentNode.childNodes[0].value,
        ]),
      });
      e.target.parentNode.childNodes[0].value = "";
    }
  }
  async function submit(e) {
    e.preventDefault();

    setLoading(true);
    try {
      if (image !== null) {
        const ref = await storage
          .ref("images/" + Math.random() + "" + Math.random() + image.name)
          .put(image);
        const url = await ref.ref.getDownloadURL();
        setState({
          ...state,

          city: lodash.capitalize(state.city.toLowerCase()),
          tags: state.tags.map((item) => item.toLowerCase()),
          search: [
            ...state.locations.map((item) => item.toLowerCase()),
            state.city.toLowerCase(),
            ...state.locations
              .toString()
              .split(",")
              .map((item) => item.toLowerCase()),
          ],
          image: url,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function removeTag(e) {
    const index = e.target.parentNode.classList[0];

    setState({
      ...state,
      tags: [
        ...state.tags.filter((item, i) => {
          if (i != index) {
            return true;
          } else return false;
        }),
      ],
    });
  }
  useEffect(async () => {
    if (state.image !== "" && state.city != "" && state.name != "" && !done) {
      setLoading(true);
      const id = await db.collection("roommate-listings").add({ ...state });

      await db
        .collection("users")
        .doc(user.uid)
        .collection("roommate-listings")
        .add({ id: id });
      setDone(true);

      setState({});
      history.push("/");
    }
  }, [state]);

  function addTag(e) {
    e.preventDefault();
    if (e.target.parentNode.childNodes[0].value) {
      setState({
        ...state,
        tags: state.tags.concat([e.target.parentNode.childNodes[0].value]),
      });
      e.target.parentNode.childNodes[0].value = "";
    }
  }

  function handleFileChange(e) {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }
  return (
    <div>
      {loading && (
        <div className="svg-div">
          <svg
            // style={{ marginTop: "260px" }}
            class="list-svg"
            height="120"
            width="120"
          >
            <circle
              cx="60"
              cy="60"
              r="40"
              stroke="#fec135"
              stroke-width="11"
              fill="transparent"
            />
            <polygon
              className="polygon"
              points="120,0 60,60 120,120"
              fill="white"
            />
          </svg>
        </div>
      )}
      {!loading && (
        <div className="list-room-form rm-form">
          <form onSubmit={submit} action="">
            <label htmlFor="name">
              Name<span className="red">*</span>{" "}
            </label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
            />

            <label htmlFor="city">
              City looking in<span className="red">*</span>
            </label>
            <input
              type="text"
              name="city"
              list="cityInputslrm"
              value={state.city}
              onChange={handleChange}
            />
            <datalist id="cityInputslrm">
              {cities.map((item) => (
                <option value={item} />
              ))}
            </datalist>

            <label htmlFor="locations">
              {" "}
              Locations looking for in the city<span className="red"></span>
            </label>
            <div className="taggy">
              <textarea
                style={{ resize: "none" }}
                rows="1"
                cols="1"
                name="locations"
              />
              <button onClick={addLocation} className="add-tag">
                Add
              </button>
            </div>

            <div className="tagbox">
              {state.locations?.map((item, index) => (
                <span className={index} key={"rmlt" + index}>
                  {" "}
                  {item}{" "}
                  <CancelIcon onClick={removeLocation} className="cancel" />{" "}
                </span>
              ))}
            </div>

            <label htmlFor="lookingFor">
              Looking for<span className="red">*</span>
            </label>
            <select
              required
              onChange={handleChange}
              value={state.lookingFor}
              name="lookingFor"
            >
              <option value="just me">Just me</option>
              <option value="couple">Couple</option>
              <option value="friends">Friends</option>
            </select>

            <label htmlFor="age">
              Age<span className="red">*</span>
            </label>
            <input
              required
              onChange={handleChange}
              value={state.age}
              type="number"
              name="age"
              id=""
            />

            <label htmlFor="gender">
              Gender<span className="red">*</span>
            </label>
            <select
              required
              onChange={handleChange}
              value={state.gender}
              name="gender"
              id=""
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="budget">
              Budget<span className="red">*</span> (
              <select
                name="currency"
                onChange={handleChange}
                value={state.currency}
                style={{
                  height: "30px",
                  padding: "5px",
                }}
              >
                <option value="€‎">€‎</option>
                <option value="Ден">Ден</option>
                <option value="L">L</option>
              </select>
              per month)
            </label>
            <input
              required
              onChange={handleChange}
              value={state.budget}
              type="number"
              name="budget"
              id=""
            />

            <label htmlFor="movingDate">
              Moving Date<span className="red">*</span>
            </label>
            <input
              required
              onChange={handleChange}
              value={state.movingDate}
              type="date"
              name="movingDate"
              id=""
            />

            <label htmlFor="children">Children</label>
            <select
              required
              onChange={handleChange}
              value={state.children}
              name="children"
              id=""
            >
              <option value="none">None</option>
              <option value="visiting children"> Children will visit</option>
              <option value="children">Children will live with me</option>
            </select>

            <label htmlFor="roommateDescription">
              Description<span className="red">*</span> (describe yourself and
              the people who are going to live with you)
            </label>
            <textarea
              required
              onChange={handleChange}
              value={state.roommateDescription}
              name="roommateDescription"
              id=""
              cols="30"
              rows="10"
            ></textarea>

            <label htmlFor="tags">
              Tags (describe specific things about yourself which will help
              interested people find you)
              <br /> example: <br />
              "cat person, non-smoker , not very social, etc"
            </label>
            <div className="taggy">
              <textarea
                className=""
                // onKeyPress={addTag}
                name="tags"
                id=""
                cols="1"
                rows="1"
                style={{ resize: "none" }}
              ></textarea>

              <button className="add-tag" onClick={addTag}>
                Add
              </button>
            </div>
            <div className="tagbox">
              {state.tags?.map((item, index) => (
                <span className={index} key={"rlt" + index}>
                  {" "}
                  {item} <CancelIcon onClick={removeTag} className="cancel" />{" "}
                </span>
              ))}
            </div>

            <label htmlFor="image">
              Image (upload a picture of you , try cropping it to a 1:1 ratio
              for best results)
            </label>
            <input
              type="file"
              name="image"
              id="ri"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div className="btn-div-rm">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#ri").click();
                }}
              >
                {" "}
                Choose file
              </button>
            </div>
            <label htmlFor="phone">
              Phone Number<span className="red">*</span>
            </label>
            <div className="ph">
              <select
                className="cc"
                name="cc"
                id=""
                value={state.cc}
                onChange={handleChange}
              >
                <option value="+383">+383</option>
                <option value="+355">+355</option>
                <option value="+389">+389</option>
              </select>
              <input
                type="number"
                name="phone"
                className="phone"
                value={state.phone}
                onChange={handleChange}
              />
            </div>
            {(state.phone && state.phone?.length < 10) ||
            state.phone?.length > 10 ? (
              <p style={{ color: "red", fontSize: "12px", marginTop: "-6px" }}>
                enter a valid phone number
              </p>
            ) : null}

            <button type="submit">List Roommate</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ListRoommate;
