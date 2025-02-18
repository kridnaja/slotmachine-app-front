import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [numberLimit, setNumberLimit] = useState(0);

  const updateNumberLimit = (newLimit) => {
    setNumberLimit(Number(newLimit)); // Ensure it's cast as a number
  };

  return (
    <GameContext.Provider value={{ numberLimit, updateNumberLimit }}>
      {children}
    </GameContext.Provider>
  );
};
