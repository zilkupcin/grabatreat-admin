import React from "react";

const UsersHeader = () => {
  return (
    <thead>
      <tr className="table__header">
        <th className="clmn-title clmn-title--user-username">Username</th>
        <th className="clmn-title clmn-title--user-country">Country</th>
        <th className="clmn-title clmn-title--user-session-country">
          Session Country
        </th>
        <th className="clmn-title clmn-title--user-points">Points</th>
        <th className="clmn-title clmn-title--user-total-points">
          Total Points
        </th>
        <th className="clmn-title clmn-title--user-invitation-code">
          Invitation Code
        </th>
        <th className="clmn-title clmn-title--user-actions">Actions</th>
      </tr>
    </thead>
  );
};

export default UsersHeader;
