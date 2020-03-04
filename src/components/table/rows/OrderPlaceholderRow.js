import React from "react";

const OrderPlaceholderRow = () => {
  return (
    <tr className="order order--placeholder">
      <td className="order__image" />
      <td className="order__number" />
      <td className="order__user" />
      <td className="order__cost" />
      <td className="order__item-name" />
      <td className="order__variant" />
      <td className="order__actions" />
    </tr>
  );
};

export default OrderPlaceholderRow;
