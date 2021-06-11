import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import "./List.css";
import { db } from "../firebase";
import { useGlobalState } from "../StateProvider";
import CancelIcon from "@material-ui/icons/Cancel";

function List({ type }) {
  const [txt, setTxt] = useState("");
  const [{ list, city, roomFilters, filteredList }, dispatch] =
    useGlobalState();
  const [noMoreData, setNoMoreData] = useState(false);
  const [tags, setTags] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [loading, setLoading] = useState(true);
  function addTag(e) {
    e.preventDefault();
    if (e.target.parentNode.childNodes[0].value) {
      setTags(tags.concat([e.target.parentNode.childNodes[0].value]));
      e.target.parentNode.childNodes[0].value = "";
    }
  }

  function removeTag(e) {
    const index = e.target.parentNode.classList[0];

    setTags(
      tags.filter((item, i) => {
        if (i != index) {
          return true;
        } else return false;
      })
    );
  }
  useEffect(async () => {
    setLoading(true);
    dispatch({
      type: "CHANGE_LIST",
      list: [],
    });

    let arr = [];

    if (city) {
      arr = await db
        .collection("room-listings")
        .where("search", "array-contains-any", [
          city,
          ...city.split(" "),
          ...city.split(","),
        ])
        // .orderBy("id", "asc")
        .limit(60)

        .get();
    } else {
      arr = await db
        .collection("room-listings")
        // .orderBy("", "asc")
        .limit(60)

        .get();
    }

    if (!arr.docs.length) {
      setTxt("no results found");
    } else {
      setTxt("");
      setLastDoc(arr?.docs[arr.docs.length - 1]);
    }

    dispatch({
      type: "CHANGE_LIST",
      list: [...arr?.docs],
    });
    setLoading(false);
  }, [city]);

  async function loadMore() {
    setLoading(true);
    let arr = [];
    if (lastDoc) {
      if (city) {
        arr = await db
          .collection("room-listings")
          .where("search", "array-contains-any", [
            city,
            ...city.split(" "),
            ...city.split(","),
          ])
          .startAfter(lastDoc)
          .limit(30)

          .get();
      } else {
        arr = await db
          .collection("room-listings")
          .startAfter(lastDoc)
          .limit(30)

          .get();
      }

      if (arr?.docs.length) {
        setLastDoc(arr?.docs[arr.docs.length - 1]);
      } else {
        setLastDoc(null);
        setNoMoreData(true);
      }

      dispatch({
        type: "CHANGE_LIST",
        list: [...list, ...arr?.docs],
      });
    } else {
      setNoMoreData(true);
    }
    setLoading(false);
  }

  useEffect(async () => {
    if (city) {
      // console.log(List);
      let arr = list;
      if (roomFilters.propertyType.length) {
        arr = arr.filter((item) =>
          roomFilters.propertyType.includes(item.data().propertyType)
        );
      }

      if (roomFilters.furnished.length) {
        arr = arr.filter((item) =>
          roomFilters.furnished.includes(item.data().furnished)
        );
      }
      if (roomFilters.preferredGender.length) {
        arr = arr.filter((item) =>
          roomFilters.preferredGender.includes(item.data().preferredGender)
        );
      }

      if (roomFilters.rooms.length) {
        arr = arr.filter((item) => {
          let bool = false;
          roomFilters.rooms.forEach((i) => {
            let arr = i.split("-");
            console.log(arr);
            if (
              item.data().rooms > Number(arr[0]) &&
              item.data().rooms <= Number(arr[1])
            ) {
              bool = true;
            }
          });
          return bool;
        });
      }

      if (roomFilters.bathrooms.length) {
        arr = arr.filter((item) => {
          let bool = false;
          roomFilters.bathrooms.forEach((i) => {
            let arr = i.split("-");
            console.log(arr);
            if (
              item.data().bathrooms > Number(arr[0]) &&
              item.data().bathrooms <= Number(arr[1])
            ) {
              bool = true;
            }
          });
          return bool;
        });
      }

      if (tags[0]) {
        // setNoMoreData(true);
        console.log(tags);
        arr = arr.filter((item) => {
          // console.log("....");
          let bool = true;
          tags.forEach((i) => {
            if (!item.data().roomTags.includes(i.toLowerCase())) {
              bool = false;
              // console.log("tags", i, item);
            }
          });

          return bool;
        });
      } else {
      }

      if (!arr.length && list.length) {
        setTxt("no results found for filtered search");
        // setNoMoreData(true);
      } else if (!arr.length && !list.length) {
        setTxt("no results found");
        setNoMoreData(true);
      } else {
        setTxt("");
        // setNoMoreData(false);
      }

      // console.log(arr);
      dispatch({
        type: "CHANGE_FILTERED_LIST",
        list: arr,
      });
    }
  }, [roomFilters, tags, list]);
  return (
    <div className="list">
      {city && (
        <div className="tags-search">
          <div className="div-tags">
            <h4>Filter by tags </h4>
            <div className="taggy">
              <textarea
                name="tags"
                className="list-tags"
                id=""
                cols="1"
                rows="1"
                style={{ resize: "none" }}
              ></textarea>
              <button onClick={addTag} className="add-tag">
                {" "}
                Add
              </button>
            </div>
          </div>
          <div className="tagbox">
            {tags?.map((item, index) => (
              <span className={index} key={"rlt" + index}>
                {" "}
                {item} <CancelIcon onClick={removeTag} className="cancel" />{" "}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* gird  */}
      {!loading && <p>{txt}</p>}
      <Grid
        type={type}
        data={filteredList?.length ? filteredList : txt ? null : list}
      />

      {!noMoreData && !loading && list.length ? (
        <button onClick={loadMore} className="login-btn  load-more">
          Load More
        </button>
      ) : (
        ""
      )}
      {loading && (
        <svg class="list-svg" height="120" width="120">
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
      )}
      {noMoreData && !loading && txt == "" && <p>no more data</p>}
    </div>
  );
}

export default List;
