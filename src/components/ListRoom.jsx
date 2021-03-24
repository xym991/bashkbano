import React, { useEffect, useState } from "react";
import "./ListRoom.css";
import { db, storage } from "../firebase";
import { useGlobalState } from "../StateProvider";
import { useHistory } from "react-router-dom";
import "./TagBox.css";
import CancelIcon from "@material-ui/icons/Cancel";

function ListRoom() {
  const [{ user }, dispatch] = useGlobalState();
  const history = useHistory();
  const [state, setState] = useState({
    address: "",
    propertyType: "",
    rent: "",
    billsIncluded: "",
    securityDeposit: "",
    availableFrom: "",
    preferredGender: "",
    bathroomType: "",
    propertyDescription: "",
    roomTags: [],
    furnished: "",

    phone: null,
    cc: null,
    coverImage: "",
    roomImages: [],
  });
  const [coverImage, setCoverImage] = useState(null);
  const [roomImages, setRoomImages] = useState(null);

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
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(async () => {
    if (state.coverImage) {
      console.log(state);
      const id = await db.collection("room-listings").add({ ...state });
      await db
        .collection("users")
        .doc(user.uid)
        .collection("room-listings")
        .add({ id: id });

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
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        setState({
          ...state,
          roomTags: state.roomTags.concat([e.target.value]),
        });
        e.target.value = "";
      }
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
    <div className="list-room-form">
      <form onSubmit={submit} id="list-room" action="">
        <label htmlFor="address">
          Address<span className="red">*</span> (do not include house number)
        </label>
        <input
          required
          value={state.address}
          onChange={handleChange}
          name="address"
          type="text"
        />

        <label htmlFor="city">
          City<span className="red">*</span>
        </label>
        <input
          type="text"
          name="city"
          value={state.city}
          onChange={handleChange}
        />

        <label htmlFor="furnished">
          Furnishing<span className="red">*</span>
        </label>
        <select
          required
          name="furnished"
          value={state.furnished}
          onChange={handleChange}
        >
          <option value="">select...</option>{" "}
          <option value="Furnished">Furnished</option>
          <option value="Semi furnished">Semi furnished</option>
          <option value="Unfurnished"> Unfurnished</option>
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
          <option value="">select...</option>{" "}
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
          Rent<span className="red">*</span> ($ per month)
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
        >
          {" "}
          required
          <option value="">select...</option>
          <option value="no">no</option>
          <option value="yes">yes</option>
        </select>
        <label htmlFor="securityDeposit">
          Security deposit<span className="red">*</span> ($)
        </label>

        <input
          required
          onChange={handleChange}
          value={state.securityDeposit}
          name="securityDeposit"
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
          <option value="either">male of female(no couples)</option>
        </select>
        <label htmlFor="bathroomType">
          Bathroom type<span className="red">*</span>
        </label>
        <select
          required
          onChange={handleChange}
          value={state.bathroomType}
          name="bathroomType"
          id=""
        >
          <option value="">select...</option>
          <option value="shared-bathroom">Shared bathroom</option>
          <option value="seperate-bathroom">Seperate bathroom</option>
          <option value="ensuite">Ensuite</option>
        </select>
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
          <br /> example : <br />
          "cat friendly, senior citizens only, internet included, parking
          included etc"
        </label>
        <textarea
          onKeyPress={addTag}
          name="roomTags"
          id=""
          cols="1"
          rows="1"
          style={{ resize: "none" }}
        ></textarea>
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

        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
}

export default ListRoom;
