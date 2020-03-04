import React from "react";

const ErrorNoData = ({ message }) => {
  return (
    <div className="error--no-data">
      <span>{message}</span>
    </div>
  );
};

export default ErrorNoData;
