import React from "react";
import UserPlaceholderRow from "./rows/UserPlaceholderRow";
import ErrorNoTableData from "../errors/ErrorNoTableData";
import UserRow from "./rows/UserRow";
import UsersHeader from "./headers/UsersHeader";
import Table from "./Table";

const UserTable = ({ users, userCount, isLoading, onUserAction, history }) => {
  const CountPlaceholder = () => {
    return (
      <div className="data-count">
        Users found:
        <div className="count-placeholder" />
      </div>
    );
  };

  const DataCount = () => {
    if (isLoading) return <CountPlaceholder />;

    return <div className="data-count">{`Users found: ${userCount}`}</div>;
  };

  const Placeholders = () => {
    let placeholders = [];
    for (let i = 0; i < 10; i++) {
      placeholders.push(<UserPlaceholderRow key={i} />);
    }
    return placeholders;
  };

  const Users = () => {
    if (users.length === 0) {
      return <ErrorNoTableData message="No users found" />;
    }

    return users.map(user => {
      return (
        <UserRow
          user={user}
          onUserAction={onUserAction}
          history={history}
          key={user.id}
        />
      );
    });
  };

  return (
    <React.Fragment>
      <DataCount />
      <Table>
        <UsersHeader />
        <tbody>{isLoading ? <Placeholders /> : <Users />}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default UserTable;
