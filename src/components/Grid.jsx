import React from "react";
import { Link } from "react-router-dom";
import "./Grid.css";
import GridItem from "./GridItem";

function Grid({ data, type, ml, Ref, collection }) {
  // console.log(data);
  return (
    <div className="grid">
      {data?.map((item, i) => (
        <Link to={`/listing/${type}/${item.id}`}>
          <GridItem
            key={item.id}
            ml={ml}
            type={type}
            item={item ? item : null}
            Ref={Ref ? Ref[i] : null}
            collection={collection}
          />
        </Link>
      ))}
    </div>
  );
}

export default Grid;
