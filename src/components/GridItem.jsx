import React, { useEffect, useState } from "react";
import { useGlobalState } from "../StateProvider";
import CancelIcon from "@material-ui/icons/Cancel";
import "./GridItem.css";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

function GridItem({ type, item, ml, Ref, collection }) {
  console.log(Ref);
  const [data, setData] = useState({});
  const history = useHistory();
  useEffect(async () => {
    setData(item?.data());
    // console.log(Ref);
  }, []);

  async function remove(e) {
    e.preventDefault();
    try {
      if (Ref) {
        const rm1 = await db
          .collection(collection)
          .doc(Ref?.data().id.id)
          .delete();
        const rm2 = await Ref?.ref.delete();

        history.replace("/");

        console.log("rm1", rm1);
        console.log("rm2", rm2);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="grid-item">
      <div className={type === "roommates" ? "grid-rm-img" : "grid-img"}>
        <img src={data?.coverImage || data?.image} alt="" />
        {/* <img src="https://res.cloudinary.com/roomies/image/upload/s--DxR29iJI--/c_fill,dpr_1.0,f_auto,fl_lossy,g_faces,h_300,q_auto,w_300/jsfbnnaeimvchfcp2d2j" /> */}
      </div>
      <div className="grid-details">
        <span className="price">${data?.rent || data?.budget}</span>
        {data?.address && data?.address.length > 30 ? (
          <h3 className="title">{data?.address.substring(0, 30)}...</h3>
        ) : (
          <h3 className="title">{data?.address}</h3>
        )}
        {data?.name && <h3 className="title">{data?.name}</h3>}

        {data?.gender && (
          <h4>
            {data?.age} years , {data?.gender}
          </h4>
        )}

        {data?.propertyType && (
          <h4>
            {data?.furnished +
              " room in a " +
              data?.propertyType +
              " with " +
              data?.bathroomType}
          </h4>
        )}
        <p className="description">
          {data?.propertyDescription && data?.propertyDescription.length > 200
            ? data?.propertyDescription.substring(0, 200) + "..."
            : data?.propertyDescription}
          {data?.roommateDescription && data?.roommateDescription.length > 200
            ? data?.roommateDescription.substring(0, 250) + "..."
            : data?.roommateDescription}
        </p>
        {data?.roommateDescription && data?.city && (
          <p className="footline">
            <small>city looking in : {data?.city}</small>
          </p>
        )}
        {data?.propertyDescription && data?.city && (
          <p className="footline">
            <small>city : {data?.city}</small>
          </p>
        )}
      </div>
      {ml && (
        <div className="listing-remove">
          <CancelIcon className="cancel" onClick={remove} />
        </div>
      )}
    </div>
  );
}

export default GridItem;
