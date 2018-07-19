import React from "react";
import { Card } from "./Card.Style";

import Roler from "../animation/Roler";
const FeatureTripNotFound = ({ loading }) => {
  return (
    <Card>
      <div
        style={{
          backgroundPosition: "center",
          width: "100%",
          height: "400px",
          backgroundSize: "cover",
          backgroundImage: `url("https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/299448/580/498/m1/fpnw/wm0/140903_-207498016-loupe-icon-.jpg?1421045834&s=eb50c6f37cf600fceb19f6b0174e4679")`
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h4 className="feature-trip__heading">
          {loading === true ? <Roler /> : "Comming Soon"}
        </h4>
      </div>
    </Card>
  );
};

export default FeatureTripNotFound;
