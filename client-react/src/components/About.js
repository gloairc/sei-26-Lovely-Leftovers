import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const About = () => {
  return (
    <div>
      <div className="mainPic">
        <div className="mainPicText">
          <p style={{ fontSize: "65px", fontWeight: "bold" }}>
            Lovely Leftovers
          </p>
          <p style={{ fontSize: "30px" }}>
            We do good with food you don't want.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
