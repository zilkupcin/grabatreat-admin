import React from "react";

const OrderHeader = () => {
  return (
    <thead>
      <tr className="table__header">
        <th className="clmn-title clmn-title--empty"></th>
        <th className="clmn-title clmn-title--order-number">Order Number</th>
        <th className="clmn-title clmn-title--user">User</th>
        <th className="clmn-title clmn-title--cost">Cost</th>
        <th className="clmn-title clmn-title--item-name">Item Name</th>
        <th className="clmn-title clmn-title--variant">Variant Name</th>
        <th className="clmn-title clmn-title--actions">Actions</th>
      </tr>
    </thead>
  );
};

export default OrderHeader;
