import React from "react";

const ModalAction = ({ action, onAction }) => {
  const getActionClasses = () => {
    return `modal__action ${
      action.type === "positive"
        ? "modal__action--positive"
        : "modal__action--negative"
    }`;
  };

  const handleAction = () => {
    onAction(action);
  };

  return (
    <span onClick className={getActionClasses(action)} onClick={handleAction}>
      {action.name}
    </span>
  );
};

export default ModalAction;
