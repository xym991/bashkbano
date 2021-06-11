import React, { useEffect, useState } from "react";
import "./ListRoom.css";
import { db, storage } from "../firebase";
import { useGlobalState } from "../StateProvider";
import { useHistory } from "react-router-dom";
import "./TagBox.css";
import CancelIcon from "@material-ui/icons/Cancel";
import lodash from "lodash";
import cities from "../ALMKXK";

function ListRoom() {
  const [{ user }, dispatch] = useGlobalState();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    address: "",
    propertyType: "apartment",
    rent: "0",
    billsIncluded: "yes",
    rooms: null,
    // securityDeposit: "0",
    availableFrom: "",
    currency: "€‎",
    preferredGender: "",
    bathrooms: "0",
    propertyDescription: "",
    roomTags: [],
    furnished: "furnished",
    city: "",
    phone: null,
    searchAdd: "",
    cc: "+383",
    coverImage: "",
    roomImages: [],
  });
  const [coverImage, setCoverImage] = useState(null);
  const [roomImages, setRoomImages] = useState(null);
  const [done, setDone] = useState(false);

  function handleChange(e) {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      if (coverImage != null) {
        const uploadCover = await storage
          .ref("images/" + `${coverImage}${Math.random()}`)
          .put(coverImage);

        var _coverImage = await uploadCover.ref.getDownloadURL();
      }

      let _roomImages = [];
      if (roomImages != null) {
        for (let i = 0; i <= roomImages.length; i++) {
          console.log(document.querySelector("#mi").files.length);
          console.log(roomImages);
          console.log(i);
          const uploadImages = await storage
            .ref("images/" + Math.random() + "" + Math.random())
            .put(roomImages[i]);
          const url = await uploadImages.ref.getDownloadURL();
          _roomImages.push(url);
        }
      }

      // const uploadImages = await storage.ref("images/").put(roomImages);
      // console.log(await uploadImages.ref.getDownloadURL());

      setState({
        ...state,
        coverImage: _coverImage,
        roomImages: [..._roomImages],
        roomTags: state.roomTags.map((item) => item.toLowerCase()),
        search: [
          state.address.toLowerCase(),
          state.city.toLowerCase(),
          ...state.address.toLowerCase().split(" "),
          ...state.address.toLowerCase().split(","),
        ],
        city: lodash.capitalize(state.city.toLowerCase()),
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(async () => {
    if (state.coverImage && !done) {
      setLoading(true);
      const id = await db.collection("room-listings").add({ ...state });

      await db
        .collection("users")
        .doc(user.uid)
        .collection("room-listings")
        .add({ id: id });

      setDone(true);
      setState({});
      history.push("/");
    }
  }, [state]);

  function removeTag(e) {
    const index = e.target.parentNode.classList[0];

    setState({
      ...state,
      roomTags: [
        ...state.roomTags.filter((item, i) => {
          if (i != index) {
            return true;
          } else return false;
        }),
      ],
    });
  }

  function addTag(e) {
    e.preventDefault();
    if (e.target.parentNode.childNodes[0].value) {
      setState({
        ...state,
        roomTags: state.roomTags.concat([
          e.target.parentNode.childNodes[0].value,
        ]),
      });
      e.target.parentNode.childNodes[0].value = "";
    }
  }

  function handleFileChange(e) {
    if (e.target.files[0]) {
      if (e.target.name === "coverImage") {
        setCoverImage(e.target.files[0]);
      } else {
        setRoomImages([...e.target.files]);
      }
    }
  }

  return (
    <div>
      {!loading && (
        <div className="list-room-form">
          <form onSubmit={submit} id="list-room" action="">
            <label htmlFor="city">
              City<span className="red">*</span>
            </label>
            <input
              type="text"
              list="cityInputslr"
              name="city"
              value={state.city}
              onChange={handleChange}
            />
            <label htmlFor="address">
              Address<span className="red">*</span> (do not include house
              number)
            </label>
            <input
              required
              value={state.address}
              onChange={handleChange}
              name="address"
              type="text"
            />

            <datalist id="cityInputslr">
              {cities.map((item) => (
                <option value={item} />
              ))}
            </datalist>

            <label htmlFor="furnished">
              Furnishing<span className="red">*</span>
            </label>
            <select
              required
              name="furnished"
              value={state.furnished}
              onChange={handleChange}
            >
              <option value="furnished">Furnished</option>
              <option value="semi-furnished">Semi furnished</option>
              <option value="unfurnished"> Unfurnished</option>
            </select>

            <label htmlFor="propertyType">
              Property type<span className="red">*</span>
            </label>
            <select
              required
              value={state.propertyType}
              onChange={handleChange}
              name="propertyType"
            >
              <option value="apartment">Apartment</option>{" "}
              <option value="condo">Condo</option>{" "}
              <option value="house">House</option>{" "}
              <option value="townhouse">Townhouse</option>{" "}
              <option value="basement">Basement</option>{" "}
              <option value="loft">Loft</option>{" "}
              <option value="studio">Studio</option>{" "}
              <option value="trailer">Trailer</option>
            </select>
            <label htmlFor="rent">
              Rent<span className="red">*</span> ({" "}
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
              </select>{" "}
              per month)
            </label>

            <input
              required
              value={state.rent}
              onChange={handleChange}
              name="rent"
              type="number"
            />
            <label htmlFor="billsIncluded">
              Bills included<span className="red">*</span>
            </label>
            <select
              value={state.billsIncluded}
              onChange={handleChange}
              name="billsIncluded"
              id=""
              required
            >
              {" "}
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
            {/* <label htmlFor="securityDeposit">
              Security deposit<span className="red">*</span> ({state.currency})
            </label>

            <input
              required
              onChange={handleChange}
              value={state.securityDeposit}
              name="securityDeposit"
              type="number"
            /> */}

            <label htmlFor="rooms">Number of rooms</label>
            <input
              onChange={handleChange}
              value={state.rooms}
              name="rooms"
              type="number"
            />
            <label htmlFor="availableFrom">
              Available from<span className="red">*</span>
            </label>
            <input
              required
              onChange={handleChange}
              value={state.availableFrom}
              type="date"
              name="availableFrom"
            />
            <label htmlFor="preferredGender">
              Preferred gender<span className="red">*</span>
            </label>
            <select
              required
              onChange={handleChange}
              value={state.preferredGender}
              name="preferredGender"
              id=""
            >
              <option value="">select...</option>
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="couples">Couples</option>
              <option value="either">Male or Memale(no couples)</option>
            </select>
            <label htmlFor="bathrooms">
              Bathroom type<span className="red">*</span>
            </label>
            {/* <select
              required
              onChange={handleChange}
              value={state.bathrooms}
              name="bathrooms"
              id=""
            >
              <option value="shared-bathroom">Shared bathroom</option>
              <option value="seperate-bathroom">Seperate bathroom</option>
              <option value="ensuite">Ensuite</option>
            </select> */}
            <input
              type="number"
              name="bathrooms"
              onChange={handleChange}
              value={state.bathrooms}
            />
            <label htmlFor="propertyDescription">
              Describe your property<span className="red">*</span>
            </label>
            <textarea
              required
              onChange={handleChange}
              value={state.propertyDescription}
              name="propertyDescription"
              id=""
              cols="30"
              rows="10"
            ></textarea>

            <label htmlFor="cover">
              Cover image<span className="red">*</span>
            </label>
            <input
              onChange={handleFileChange}
              required
              // value={state.coverImage}
              type="file"
              id="ci"
              name="coverImage"
              style={{ display: "none" }}
            />
            <div className="btn-div-rm">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#ci").click();
                }}
              >
                Choose file
              </button>
            </div>

            <label htmlFor="images">More images</label>
            <input
              onChange={handleFileChange}
              type="file"
              id="mi"
              // value={state.roomImages}
              name="roomImages"
              style={{ display: "none" }}
              multiple
            />
            <div className="btn-div-rm">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#mi").click();
                }}
              >
                Choose file(s)
              </button>
            </div>

            <label htmlFor="roomTags">
              Tags (describe specific things about your property)
              <br /> example: <br />
              "cat friendly, senior citizens only, internet included, parking
              included etc"
            </label>
            <div className="taggy">
              <textarea
                name="roomTags"
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
              {state.roomTags?.map((item, index) => (
                <span className={index} key={"rlt" + index}>
                  {" "}
                  {item} <CancelIcon onClick={removeTag} className="cancel" />{" "}
                </span>
              ))}
            </div>
            <label htmlFor="phone">
              Phone Number<span className="red">*</span>
            </label>
            <div className="ph">
              <select
                className="cc"
                name="cc"
                id=""
                required
                value={state.cc}
                onChange={(e) => setState({ ...state, cc: e.target.value })}
              >
                <option value="+383">+383</option>
                <option value="+355">+355</option>
                <option value="+389">+389</option>
              </select>
              <input
                type="number"
                name="phone"
                required
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

            <button type="submit">Create Listing</button>
          </form>
        </div>
      )}

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
    </div>
  );
}

export default ListRoom;
