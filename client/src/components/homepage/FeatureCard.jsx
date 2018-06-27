import React from "react";

const FeatureCard = ({ icon, heading, text }) => {
  return (
    <div className="feature__card">
      <div className="feature__icon">
        <i className={icon} />
      </div>
      <h4 className="feature__heading">{heading}</h4>
      <p className="feture__text">{text}</p>
    </div>
  );
};

export default FeatureCard;
