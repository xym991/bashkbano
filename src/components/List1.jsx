import React, { useEffect } from "react";
import Grid from "./Grid";
import "./List.css";
import { db } from "../firebase";
import { useGlobalState } from "../StateProvider";

function List({ type }) {
  const [{ user, list }, dispatch] = useGlobalState();
  useEffect(async () => {
    dispatch({
      type: "CHANGE_LIST",
      list: [],
    });
    let arr = [];
    if (type == "roommates")
      arr = await db.collection("roommate-listings").get();
    else arr = await db.collection("room-listings").get();

    dispatch({
      type: "CHANGE_LIST",
      list: [...arr?.docs],
    });
  }, []);

  return (
    <div className="list">
      {/* gird  */}
      <Grid type={type} data={list} />
    </div>
  );
}

export default List;
