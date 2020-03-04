import React from "react";
import LoadingIndicatorButton from "../loading/LoadingIndicatorButton";

const Button = ({ title, className, isLoading, onClick }) => {
  const getClassName = () => {
    let classes = [];
    classes.push(className);

    if (isLoading) {
      classes.push("active");
    }

    return classes.join(" ");
  };

  return (
    <button
      type="submit"
      className={getClassName()}
      disabled={isLoading ? true : false}
      onClick={onClick}
    >
      {isLoading ? <LoadingIndicatorButton /> : title}
    </button>
  );
};

export default Button;
