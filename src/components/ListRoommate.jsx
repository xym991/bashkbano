import React, { useState, useEffect } from "react";
import { useGlobalState } from "../StateProvider";
import "./TagBox.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { db, storage } from "../firebase";
import { useHistory } from "react-router-dom";
function ListRoommate() {
  const [{ user }, dispatch] = useGlobalState();
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [state, setState] = useState({
    locations: [],
    lookingFor: "",
    age: "",
    gender: "",
    budget: "",
    movingDate: "",
    occupation: "",
    children: "",
    roommateDescription: "",
    cc: null,
    phone: null,
    image: "",
    city: "",
    name: "",
    lookingToStay: "",
  });
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
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        setState({
          ...state,
          locations: state.locations.concat([e.target.value]),
        });
        e.target.value = "";
      }
    }
  }
  async function submit(e) {
    e.preventDefault();
    if (state.locations) {
      try {
        if (image !== null) {
          const ref = await storage
            .ref("images/" + Math.random() + "" + Math.random() + image.name)
            .put(image);
          const url = await ref.ref.getDownloadURL();
          setState({
            ...state,
            image: url,
          });

          history.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  useEffect(async () => {
    if (state.image != "") {
      const id = await db.collection("roommate-listings").add({ ...state });

      await db
        .collection("users")
        .doc(user.uid)
        .collection("roommate-listings")
        .add({ id: id });

      // setState({});
      // history.push("/");
    }
  }, [state]);

  function handleFileChange(e) {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }
  return (
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
        <label htmlFor="locations">
          {" "}
          Locations looking for in the city<span className="red"></span>
        </label>
        <textarea
          style={{ resize: "none" }}
          onKeyPress={addLocation}
          rows="1"
          cols="1"
          name="locations"
        />
        <div className="tagbox">
          {state.locations?.map((item, index) => (
            <span className={index} key={"rmlt" + index}>
              {" "}
              {item} <CancelIcon onClick={removeLocation} className="cancel" />{" "}
            </span>
          ))}
        </div>

        <label htmlFor="city">
          City looking in<span className="red">*</span>
        </label>
        <input
          type="text"
          name="city"
          value={state.city}
          onChange={handleChange}
        />

        <label htmlFor="lookingFor">
          Looking for<span className="red">*</span>
        </label>
        <select
          required
          onChange={handleChange}
          value={state.lookingFor}
          name="lookingFor"
        >
          <option value="">select...</option>
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
          <option value="">select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="budget">
          Budget<span className="red">*</span> ($ per month)
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
          <option value="">select...</option>
          <option value="none">None</option>
          <option value="visiting children"> Children will visit</option>
          <option value="children">Children will live with me</option>
        </select>

        <label htmlFor="roommateDescription">
          Description<span className="red">*</span> (describe yourself and the
          people who are going to live with you)
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

        {/* <label htmlFor="lookingToStay"></label>
        <input
          type="text"
          name="lookingToStay"
          value={state.lookingToStay}
          onChange={handleChange}
        /> */}

        <label htmlFor="image">Image (upload a picture of you)</label>
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
            <option value="+88">+88</option>
            <option value="+89">+89</option>
            <option value="+90">+90</option>
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
  );
}

export default ListRoommate;
