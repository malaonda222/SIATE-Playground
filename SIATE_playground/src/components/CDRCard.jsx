import React from "react";

const CDRCard = ({ component }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">CDR Card</h5>
        <p className="card-text">Statistiche CDR...</p>
        <button className="btn btn-primary">View</button>
      </div>
    </div>
  );
};

export default CDRCard;
