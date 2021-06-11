import React, { useEffect, useState } from "react";
import "./MyListings.css";
import Grid from "./Grid";
import { db } from "../firebase";
import { useGlobalState } from "../StateProvider";

function MyListings() {
  const [roomListings, setRoomListings] = useState([]);
  const [roommateListing, setRoommateListing] = useState([]);
  const [{ user }, dispatch] = useGlobalState();
  const [roommateUserList, setRoommateUserList] = useState([]);
  const [roomUserList, setRoomUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const doc = await db
        .collection("users")
        .doc(user?.uid)
        .collection("room-listings")
        .get();
      const ids = [];
      console.log(doc.docs[0].data());
      doc.docs.forEach((doc) => {
        ids.push(doc.data().id);
        setRoomUserList([...roomUserList, doc]);
      });
      console.log(ids);

      // console.log(roomUserList);

      ids.forEach(async (item) => {
        const data = await db.collection("room-listings").doc(item.id).get();
        if (data.exists) {
          setRoomListings((prev) => [...prev, data]);
        }
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }

    try {
      const doc = await db
        .collection("users")
        .doc(user?.uid)
        .collection("roommate-listings")
        .get();
      const ids = [];
      doc.forEach((item) => {
        ids.push(item.data().id);
        setRoommateUserList([...roommateUserList, item]);
      });

      ids.forEach(async (item) => {
        const data = await db
          .collection("roommate-listings")
          .doc(item.id)
          .get();

        if (data.exists) {
          setRoommateListing([data]);
        }
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    console.log(roomListings);
  }, [roomListings]);

  return (
    <div>
      {" "}
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
        <div className="my-listings">
          <div className="listings-room-listings">
            <h3 className="mlh">Room Listings ({roomListings.length}/3)</h3>
            <Grid
              data={roomListings}
              collection={"room-listings"}
              ml={true}
              Ref={roomUserList}
              type="rooms"
            />
          </div>
          <div className="listings-roommate-listings">
            <h3 className="mlh">
              Roommate Listing ({roommateListing.length}/1)
            </h3>
            <Grid
              data={roommateListing}
              Ref={roommateUserList}
              type={"roommates"}
              collection={"roommate-listings"}
              ml={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyListings;
