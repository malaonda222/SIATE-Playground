import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDraggable } from "@dnd-kit/core";
import CDRCard from "./CDRCard";
import PatientCard from "./PatientCard";
import PropertyStatsCard from "./PropertyStatsCard";
 
const ComponentWrapper = ({
  component,
  selected,
  onToggleLock,
  onSelect,
}) => {
  const { id, x, y, type, locked } = component || {};

  // Hook di dnd-kit per rendere l'elemento trascinabile
  const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
    id, // serve per identificare univocamente l'oggetto
    disabled: locked || !selected // disabilita il frag se bloccato
  })
  
  // Calcola posizione attuale (drag temporaneo + posizione salvata)
  const style = {
    position: "absolute",
    left: x + (transform?.x ?? 0),
    top: y + (transform?.y ?? 0),
    border: selected ? "2px solid blue" : "1px solid gray",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: locked ? "#eee" : "white",
    cursor: locked ? "not-allowed" : selected ? "move" : "pointer",
  };


  let CardComponent;
  switch (type) {
    case "patient":
      CardComponent = PatientCard;
      break;
    case "cdr":
      CardComponent = CDRCard;
      break;
    case "property_stats":
      CardComponent = PropertyStatsCard;
      break;
    default:
      CardComponent = () => <div>Tipo sconosciuto</div>;
  }
 
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => onSelect(id)}
    >
      <CardComponent component={component} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock(id);
        }}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        <i className={`fa-solid ${locked ? "fa-lock" : "fa-lock-open"}`}></i>
      </button>
    </div>
  );
};

export default ComponentWrapper;