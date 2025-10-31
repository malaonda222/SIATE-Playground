import React from "react";

const PatientCard = ({ component }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">Patient Card</h5>
        <p className="card-text">Informazioni paziente...</p>
        <button className="btn btn-primary">Note</button>
      </div>
    </div>
  );
};

export default PatientCard;
