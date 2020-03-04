import React from "react";

const UserPlaceholderRow = () => {
  return (
    <tr className="user user--placeholder">
      <td className="user__username" />
      <td className="user__country" />
      <td className="user__session-country" />
      <td className="user__points" />
      <td className="user__total-points" />
      <td className="user__invitation-code" />
      <td className="user__actions" />
    </tr>
  );
};

export default UserPlaceholderRow;
