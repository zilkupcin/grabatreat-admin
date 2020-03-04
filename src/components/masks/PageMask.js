import React, { useContext } from "react";
import { MaskContext } from "../../contexts/MaskContext";
import { ModalContext } from "../../contexts/ModalContext";

const PageMask = () => {
  const [maskActive, setMaskActive] = useContext(MaskContext);
  const [modalContent, setModalContent] = useContext(ModalContext);

  return (
    <div
      className={`page-mask ${
        maskActive || modalContent.title ? "page-mask--active" : ""
      }`}
    />
  );
};

export default PageMask;
