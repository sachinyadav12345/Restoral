import React from "react";
import logo from "../Assets/Icon/logo-inverse-280x60.png";
function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-heading">
              <img
                src={logo}
                alt=""
                className="img-fluid"
                style={{ maxHeight: "30px" }}
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                voluptatibus earum dignissimos beatae officiis voluptates,
                cumque atque asperiores. Possimus quasi, modi dolores deleniti
                nihil sapiente?
              </p>
            </div>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
