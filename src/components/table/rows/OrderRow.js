import React from "react";
import { ArrowDropDownRounded } from "@material-ui/icons";
import imageErrorPlaceholder from "../../../images/image_error_placeholder.jpg";

const OrderRow = React.memo(({ order, onOrderAction, history }) => {
  const handleOrderAction = e => {
    const actionType = e.target.dataset.type;
    onOrderAction(actionType, order.id);
  };

  const handleUserIdClick = () => {
    history.push(`/users/view/${order.get("user")}`);
  };

  const handleImageError = e => {
    e.target.src = imageErrorPlaceholder;
  };

  return (
    <tr className="order">
      <td className="order__image">
        <img
          src={order.get("productImageSrc")}
          alt="order"
          onError={handleImageError}
        />
      </td>
      <td className="order__number">{`#${order.get("orderNumber")}`}</td>
      <td className="order__user" onClick={handleUserIdClick}>
        {order.get("user")}
      </td>
      <td className="order__cost">{`${order.get("orderCost")} Points`}</td>
      <td className="order__item-name">{order.get("productName")}</td>
      <td className="order__variant">{order.get("variantTitle")}</td>
      <td className="order__actions">
        <ArrowDropDownRounded />
        <span>Select</span>
        <ul className="order__action-list">
          <li
            className="action--refund"
            data-type="refund"
            onClick={handleOrderAction}
          >
            Refund
          </li>
          <li
            className="action--delete"
            data-type="delete"
            onClick={handleOrderAction}
          >
            Delete
          </li>
        </ul>
      </td>
    </tr>
  );
});

export default OrderRow;
