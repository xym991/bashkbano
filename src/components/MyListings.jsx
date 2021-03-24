import React, { useEffect, useState } from "react";
import "./MyListings.css";
import Grid from "./Grid";
import { db } from "../firebase";
import { useGlobalState } from "../StateProvider";

function MyListings() {
  const [roomListings, setRoomListings] = useState([]);
  const [roommateListing, setRoommateListing] = useState([]);
  const [{ user }, dispatch] = useGlobalState();
  useEffect(async () => {
    try {
      const doc = await db
        .collection("users")
        .doc(user?.uid)
        .collection("room-listings")
        .get();
      const ids = [];
      doc.forEach((doc) => {
        ids.push(doc.data().id);
      });

      ids.forEach(async (item) => {
        const data = await db.collection("room-listings").doc(item.id).get();
        if (data.exists) {
          setRoomListings([...roomListings, data]);
        }
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
      doc.forEach((item) => ids.push(item.data().id));

      ids.forEach(async (item) => {
        const data = await db
          .collection("roommate-listings")
          .doc(item.id)
          .get();

        if (data.exists) {
          setRoommateListing([data]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [user]);
  return (
    <div className="my-listings">
      <div className="listings-room-listings">
        <h3 className="mlh">Room Listings ({roomListings.length}/3)</h3>
        <Grid data={roomListings} type="rooms" />
      </div>
      <div className="listings-roommate-listings">
        <h3 className="mlh">Roommate Listing ({roommateListing.length}/1)</h3>
        <Grid data={roommateListing} type={"roommates"} />
      </div>
    </div>
  );
}

export default MyListings;
