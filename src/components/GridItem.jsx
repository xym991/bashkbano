import React from "react";
import "./GridItem.css";

function GridItem({ type, data }) {
  return (
    <div className="grid-item">
      <div className={type === "roommates" ? "grid-rm-img" : "grid-img"}>
        <img src={data?.coverImage || data?.image} alt="" />
        {/* <img src="https://res.cloudinary.com/roomies/image/upload/s--DxR29iJI--/c_fill,dpr_1.0,f_auto,fl_lossy,g_faces,h_300,q_auto,w_300/jsfbnnaeimvchfcp2d2j" /> */}
      </div>
      <div className="grid-details">
        <span className="price">${data?.rent || data?.budget}</span>
        {data?.address && <h3 className="title">{data?.address}</h3>}
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
            ? data?.propertyDescription.substring(0, 200)
            : data?.propertyDescription}
          {data?.roommateDescription && data?.roommateDescription.length > 200
            ? data?.roommateDescription.substring(0, 200)
            : data?.roommateDescription}
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          repellendus, quod dolore, minima unde nulla voluptatem ad deleniti
          beatae, nisi possimus sas officiis ... */}
        </p>
        {data?.city && (
          <p className="footline">
            <small>city looking in : {data?.city}</small>
          </p>
        )}
      </div>
    </div>
  );
}

export default GridItem;
