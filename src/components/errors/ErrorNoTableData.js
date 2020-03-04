import React from "react";

const ErrorNoTableData = ({ message }) => {
  return (
    <tr>
      <td className="error--no-data">{message}</td>
    </tr>
  );
};

export default ErrorNoTableData;
