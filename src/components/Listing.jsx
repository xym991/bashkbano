import React, { useEffect, useState } from "react";
import "./Listing.css";
import PhoneIcon from "@material-ui/icons/Phone";
import { Link } from "react-router-dom";
import { useGlobalState } from "../StateProvider";
import { db } from "../firebase";

function Listing({ type }) {
  const [{ user }, dispatch] = useGlobalState();
  const roommate = type == "roommate" ? true : false;

  const id = window.location.href.split("/")[5];

  const [data, setData] = useState({});

  const [img, setImg] = useState(null);

  useEffect(() => {
    db.collection(roommate ? "roommate-listings" : "room-listings")
      .doc(id)
      .get()
      .then((doc) => {
        setData({ ...doc.data() });
      });
  }, []);

  useEffect(() => {
    if (roommate) {
      setImg(data?.image);
    } else {
      setImg(data?.coverImage);
    }
  }, [data]);

  return (
    <div className="Listing">
      {roommate ? (
        <div className="listing-img-rm">
          <img src={img} />
        </div>
      ) : (
        <div className="listing_img-div">
          <img src={img} />
        </div>
      )}

      <div className="Listing-heading">
        <h2>{roommate ? data?.name : data?.address}</h2>
        <p>
          {roommate
            ? data?.age + " years, " + data?.gender
            : data?.furnished +
              " room in a " +
              data?.propertyType +
              " with " +
              data?.bathroomType}
        </p>
      </div>
      {!roommate && (
        <div className="Listing_details">
          <div className="detail">
            <div>Rent</div>
            <div>${data?.rent} per Month</div>
          </div>
          <div className="detail">
            <div>Bills</div>
            <div>{data?.billsIncluded}</div>
          </div>
          <div className="detail">
            <div>Security deposit</div>
            <div>${data?.securityDeposit}</div>
          </div>
          <div className="detail">
            <div>Available from</div>
            <div>{data?.availableFrom}</div>
          </div>
          <div className="detail">
            <div>Preferred gender</div>
            <div>{data?.preferredGender}</div>
          </div>
          <div className="detail">
            <div>Bathroom type</div>
            <div>{data?.bathroomType}</div>
          </div>
          <div className="detail">
            <div>Property type</div>
            <div>{data?.propertyType}</div>
          </div>
          <div className="detail">
            <div>Room furnishing</div>
            <div>{data?.furnishing}</div>
          </div>
        </div>
      )}
      {roommate && (
        <div className="Listing_details">
          <div className="detail">
            <div>Budget</div>
            <div>${data?.budget} per Month</div>
          </div>
          <div className="detail">
            <div>Accomodation for</div>
            <div>{data?.lookingFor}</div>
          </div>

          <div className="detail">
            <div>Ready to move</div>
            <div>{data?.movingDate}</div>
          </div>

          <div className="detail">
            <div>Children</div>
            <div>{data?.children}</div>
          </div>
        </div>
      )}
      <div className="listing-description">
        <h3>
          {roommate ? "About " + data.name?.split(" ")[0] : "About the Room"}
        </h3>
        <p>
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          nostrum iste optio, molestias, repellendus exercitationem et dolor
          expedita culpa corrupti rerum blanditiis cupiditate rem laboriosam?
          Hic labore itaque ullam animi mollitia molestiae totam adipisci
          consequatur. Saepe qui cupiditate illo corporis tempore odit est,
          distinctio perferendis mollitia vel ipsum molestias quaerat velit
          maiores et iste, voluptatibus, ducimus dolor possimus labore impedit?
          Voluptatum aspernatur impedit amet qui deleniti soluta perspiciatis
          labore repudiandae quam commodi ea laborum alias, sit expedita ducimus
          ut doloremque autem, rerum necessitatibus dolores unde ad. Sed
          voluptatibus dolorem aspernatur, praesentium, quod unde voluptates
          iusto iure non, at delectus vero! */}
          {data?.roommateDescription || data?.propertyDescription}
        </p>
      </div>
      <div className="listing-tags">
        <h3>{roommate ? "Locations looking in" : "Tags"}</h3>
        <div className="tagbox tb-l">
          {roommate
            ? data.locations?.map((item) => <span>{item}</span>)
            : data.roomTags?.map((item) => <span>{item}</span>)}
        </div>
      </div>
      <div className="listing-contact">
        <h3>Contact Details</h3>
        {user ? (
          <a href="tel:">
            <div>
              <PhoneIcon className="phoneIcon" />
              <div>
                <h4>Phone Number</h4>
                <p>
                  {data.cc + " "}
                  {data.phone}
                </p>
              </div>
            </div>
          </a>
        ) : (
          <h4>Please login to see contact details</h4>
        )}
      </div>
      {!roommate ? (
        <div className="Login">
          <h3>List your room now</h3>
          <div>
            <Link to="/list-room">
              <button className="login-btn lg">List Room </button>
            </Link>
            <Link to="/rooms">
              <button className="sign-up-btn gr lg"> Find a Room</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="Login">
          <h3>List your room now</h3>
          <div>
            <Link to="/list-roommate">
              <button className="login-btn lg">List Roommate </button>
            </Link>
            <Link to="/">
              <button className="sign-up-btn gr lg"> Find a Roommate</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
