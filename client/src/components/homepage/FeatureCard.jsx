import React from "react";
import { Card } from "./Card.Style";

const FeatureCard = ({ icon, heading, text }) => {
  return (
    <Card
      theme={{
        hover: {
          borderRadius: "20%",
          transform: "scale(1.1) translateY(-2px)",
          boxShadow: "1px 0.5rem 1rem rgba(0, 0, 0, 0.2)"
        }
      }}
    >
      <div style={{ textAlign: "center", padding: "1.6rem" }}>
        <i style={{ fontSize: "4.6rem" }} className={icon} />
      </div>
      <h4 className="feature__heading">{heading}</h4>
      <p className="feture__text">{text}</p>
    </Card>
  );
};

export default FeatureCard;
