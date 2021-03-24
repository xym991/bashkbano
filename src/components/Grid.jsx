import React from "react";
import { Link } from "react-router-dom";
import "./Grid.css";
import GridItem from "./GridItem";

function Grid({ data, type }) {
  return (
    <div className="grid">
      {data?.map((item) => (
        <Link to={`/listing/${type}/${item.id}`}>
          <GridItem
            key={item.id}
            type={type}
            data={item?.data ? item.data() : null}
          />
        </Link>
      ))}
    </div>
  );
}

export default Grid;
