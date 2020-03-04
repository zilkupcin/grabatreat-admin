import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState({});
  return (
    <ModalContext.Provider value={[modalContent, setModalContent]}>
      {children}
    </ModalContext.Provider>
  );
};
