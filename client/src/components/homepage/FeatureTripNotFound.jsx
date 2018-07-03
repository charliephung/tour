import React from "react";
import Roler from "../animation/Roler";
const FeatureTripNotFound = ({ loading }) => {
  return (
    <div className="feature-trip__card" style={{ height: "370px" }}>
      <img
        src="https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/299448/580/498/m1/fpnw/wm0/140903_-207498016-loupe-icon-.jpg?1421045834&s=eb50c6f37cf600fceb19f6b0174e4679"
        alt="not found"
      />
      <br />
      <br />
      <h4 className="feature-trip__heading">
        {loading === true ? <Roler /> : "Comming Soon"}
      </h4>
    </div>
  );
};

export default FeatureTripNotFound;
