import React, { useState, createContext } from "react";

export const MaskContext = createContext();

export const MaskProvider = ({ children }) => {
  const [maskActive, setMaskActive] = useState(false);
  return (
    <MaskContext.Provider value={[maskActive, setMaskActive]}>
      {children}
    </MaskContext.Provider>
  );
};
