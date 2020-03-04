import React, { useContext } from "react";
import ModalAction from "./ModalAction";
import { ModalContext } from "../../contexts/ModalContext";

const Modal = () => {
  const [modalContent, setModalContent] = useContext(ModalContext);

  if (!modalContent.title) {
    return null;
  }

  const handleModalAction = action => {
    modalContent.onAction(modalContent.modalType, action, modalContent.payload);
  };

  return (
    <div className="modal">
      <h3 className="modal__title">{modalContent.title}</h3>
      <p className="modal__message">{modalContent.message}</p>
      <div className="modal__actions">
        {modalContent.actions.map(action => {
          return (
            <ModalAction
              action={action}
              key={action.name}
              onAction={handleModalAction}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Modal;
