import React from "react";
import "./Footer.css";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

function Footer() {
  return (
    <div className="footer">
      <h2>contact us</h2>
      <div className="social-links">
        <InstagramIcon />
        <FacebookIcon />
        <TwitterIcon />
      </div>
      <p>copyright&copy; bashkbano 2021 </p>
    </div>
  );
}

export default Footer;
