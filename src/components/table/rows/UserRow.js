import React from "react";
import { ArrowDropDownRounded } from "@material-ui/icons";

const UserRow = ({ user, onUserAction, history }) => {
  const handleUserAction = e => {
    const actionType = e.target.dataset.type;
    onUserAction(actionType, user.id);
  };

  const handleUsernameClick = () => {
    history.push(`users/view/${user.id}`);
  };

  return (
    <tr className="user">
      <td className="user__username" onClick={handleUsernameClick}>
        {user.get("username")}
      </td>
      <td className="user__country">
        {user.get("regCountry") ? user.get("regCountry") : "-"}
      </td>
      <td className="user__session-country">
        {user.get("sessionCountry") ? user.get("sessionCountry") : "-"}
      </td>
      <td className="user__points">{`${user.get("points")} Points`}</td>
      <td className="user__total-points">{`${user.get(
        "allTimePoints"
      )} Points`}</td>
      <td className="user__invitation-code">{user.get("invCode")}</td>
      <td className="user__actions">
        <ArrowDropDownRounded />
        <span>Select</span>
        <ul className="user__action-list">
          <li
            className="action--delete"
            data-type="delete"
            onClick={handleUserAction}
          >
            Delete
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default UserRow;
