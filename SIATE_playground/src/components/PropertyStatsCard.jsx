import React from "react";

const PropertyStatsCard = ({ component }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">Property Stats</h5>
        <p className="card-text">Statistiche proprietà...</p>
        <button className="btn btn-primary">Open</button>
      </div>
    </div>
  );
};

export default PropertyStatsCard;
