import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ComponentWrapper from "./ComponentWrapper"; // wrapper per ogni card

const Canvas = () => {
  const [menuOpen, setMenuOpen] = useState(false); // menu radiale aperto o chiuso
  const [components, setComponents] = useState({}); // oggetti dei componenti
  const [selectedId, setSelectedId] = useState(null); // id della card selezionata

  // Aggiunge un componente nuovo
  const handleAddComponent = (type) => {
    const id = Date.now().toString(); // id univoco
    setComponents((prev) => ({
      ...prev,
      [id]: {
        id,
        x: 50, // posizione iniziale X
        y: 50, // posizione iniziale Y
        type,
        locked: false, // inizialmente sbloccata
        content:
          type === "patient"
            ? "Patient"
            : type === "cdr"
            ? "CDR"
            : "property_stats",
      },
    }));
    setSelectedId(id); // seleziona la card appena creata
  };

  // Toggle lock/unlock
  const handleToggleLock = (id) => {
    setComponents((prev) => ({
      ...prev,
      [id]: { ...prev[id], locked: !prev[id].locked },
    }));
  };

  // Selezione card
  const handleSelect = (id) => {
    setSelectedId(id);
  };

  // Gestione del "rilascio" dopo drag (nuova logica DnDKit)
  const handleDragEnd = (event) => {
    const { active, delta } = event;

    // Se non esiste un delta (nessun movimento), esci
    if (!delta) return;

    // Funzione di aggiornamento dello stato
    setComponents((prev) => {
      const current = prev[active.id];
      if (!current || current.locked) return current; //ignora se bloccato

      // active = chi è stato trascinato, delta = di quanto si è mosso l'elemento
      return { 
        ...prev,
        [active.id]: {
          ...current,
          x: current.x + delta.x, // spostamento orizzontale (in pixel)
          y: current.y + delta.y, //spostamento verticale (in pixel)
        },
      };
    });
  };

  return (
    <div
      className="canvas"
      style={{
        position: "relative",
        width: "100%",
        height: "80vh",
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
      }}
    >
      {/* Tutti i componenti trascinabili devono stare dentro DndContext */}
      <DndContext onDragEnd={handleDragEnd}>
        {Object.entries(components).map(([id, component]) => (
          <ComponentWrapper
            key={id}
            component={component}
            selected={selectedId === id}
            onToggleLock={handleToggleLock}
            onSelect={handleSelect}
          />
        ))}
      </DndContext>

      {/* pulsante + principale */}
      <button
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "24px",
          cursor: "pointer",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        +
      </button>

      {/* menu radiale */}
      {menuOpen &&
        [0, 1, 2].map((i) => {
          const radius = 80;
          const angles = [0, 35, 70];
          const rad = (angles[i] * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <button
              key={i}
              style={{
                position: "absolute",
                right: 20 + x,
                bottom: 20 + y,
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleAddComponent(["patient", "cdr", "property_stats"][i])
              }
            >
              {["P", "C", "S"][i]}
            </button>
          );
        })}
    </div>
  );
};

export default Canvas;
