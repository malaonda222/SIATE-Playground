// Simula una chiamata al server per ottenere l'ontologia

export const fetchOntology = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        version: "1.0",

        entities: ["Patient", "CDR", "PropertyStats"],
      });
    }, 800);
  });
};

// Simula il salvataggio dello stato del playground

export const savePlaygroundState = async (state) => {
  return new Promise((resolve) => {
    console.log("Stato playground salvato (simulato):", state);

    setTimeout(() => resolve({ success: true }), 500);
  });
};
