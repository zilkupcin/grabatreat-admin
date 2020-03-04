import React, { useState, useEffect, useContext } from "react";
import Section from "../sections/Section";
import Pagination from "../pagination/Pagination";
import { ModalContext } from "../../contexts/ModalContext";
import { NotificationContext } from "../../contexts/NotificationContext";
import {
  buildNotification,
  NOTIFICATION_TYPE_NEGATIVE,
  NOTIFICATION_TYPE_POSITIVE
} from "../../data/notifications";
import {
  fetchUsersPagination,
  queryUsersPagination,
  deleteUser
} from "../../api/parseCloud";
import { userFilters } from "../../data/filters";
import Filter from "../filter/Filter";
import { withRouter } from "react-router-dom";
import { MODAL_USER_DELETE } from "../../data/modals";
import UserTable from "../table/UserTable";

const Users = withRouter(({ history }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [userCount, setUserCount] = useState(0);
  const [resetEnabled, setResetEnabled] = useState(false);
  const [queryMode, setQueryMode] = useState(false);

  // TODO: Add a results per page selector to this component
  const [resultsPerPage, setResultsPerPage] = useState(20);

  //Filter state
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(userFilters[0]);
  const [selectedCondition, setSelectedCondition] = useState(
    selectedFilter.conditions[0]
  );

  //Context
  const [modalContent, setModalContent] = useContext(ModalContext);
  const [notification, setNotification] = useContext(NotificationContext);

  useEffect(() => {
    fetchUsers(1);
  }, [queryMode]);

  const handlePageChange = page => {
    setIsLoading(true);
    setCurrentPage(page);
    fetchUsers(page);
  };

  const fetchUsers = async page => {
    setIsLoading(true);
    try {
      let skip = page * resultsPerPage - resultsPerPage;
      let result;

      if (queryMode) {
        result = await queryUsersPagination(
          skip,
          resultsPerPage,
          selectedFilter.key,
          selectedCondition.key,
          query
        );
      } else {
        result = await fetchUsersPagination(skip, resultsPerPage);
      }
      setUsers(result.users);
      setUserCount(result.count);
      setIsLoading(false);
    } catch (e) {
      setUsers([]);
      setUserCount(0);
      setIsLoading(false);
      setNotification(e.message, NOTIFICATION_TYPE_NEGATIVE);
    }
  };

  const handleUserActionClick = (actionType, userId) => {
    let content = {};

    if (actionType === "delete") {
      content = MODAL_USER_DELETE;
      content.payload = { userId };
    }

    content.onAction = handleDialogAction;

    setModalContent(content);
  };

  const handleDialogAction = async (modalType, action, payload) => {
    if (modalType === "delete_user") {
      if (action.id === "action_yes") {
        try {
          await deleteUser(payload.orderId);
          fetchUsers(1);
          setNotification(
            buildNotification("User deleted!", NOTIFICATION_TYPE_POSITIVE)
          );
        } catch (error) {
          setNotification(
            buildNotification(error.message, NOTIFICATION_TYPE_NEGATIVE)
          );
        }
      }
    }
    setModalContent({});
  };

  const handleQuerySubmit = async () => {
    const queryKey = selectedFilter.key;
    const queryCondition = selectedCondition.key;
    const queryContent = query;

    if (queryContent === "") {
      setNotification(
        buildNotification("Please enter your query", NOTIFICATION_TYPE_NEGATIVE)
      );
      return;
    }

    setUserCount(0);
    setQueryMode(true);
    setResetEnabled(true);

    if (queryMode) {
      submitQuery(queryKey, queryCondition, queryContent);
    }
  };

  const submitQuery = async (queryKey, queryCondition, queryContent) => {
    try {
      setIsLoading(true);
      const result = await queryUsersPagination(
        0,
        resultsPerPage,
        queryKey,
        queryCondition,
        queryContent
      );
      setUsers(result.users);
      setUserCount(result.count);
      setIsLoading(false);
    } catch (e) {
      setUsers([]);
      setUserCount(0);
      setIsLoading(false);
      setNotification("An error occurred", NOTIFICATION_TYPE_NEGATIVE);
    }
  };

  const handleQueryReset = () => {
    setQueryMode(false);
    setQuery("");
    setSelectedFilter(userFilters[0]);
    if (userFilters[0].conditions[0] !== undefined) {
      setSelectedCondition(userFilters[0].conditions[0]);
    }
    setResetEnabled(false);
    setIsLoading(true);
    setUserCount(0);
    setCurrentPage(1);
  };

  const handleQueryChange = e => {
    setQuery(e.target.value);
  };

  const handleDropdownItemClick = (dropdownName, item) => {
    if (dropdownName === "filter-keys") {
      setSelectedFilter(item);
      setQuery("");
      if (item.conditions) {
        setSelectedCondition(item.conditions[0]);
      }
    } else if (dropdownName === "filter-conditions") {
      setSelectedCondition(item);
    }
  };

  return (
    <Section size="full" title="Users">
      <Filter
        resetEnabled={resetEnabled}
        onQuerySubmit={handleQuerySubmit}
        onQueryReset={handleQueryReset}
        onQueryChange={handleQueryChange}
        onDropdownItemClick={handleDropdownItemClick}
        selectedFilter={selectedFilter}
        selectedCondition={selectedCondition}
        filters={userFilters}
        isLoading={isLoading}
        query={query}
      />
      <UserTable
        users={users}
        userCount={userCount}
        onUserAction={handleUserActionClick}
        history={history}
        isLoading={isLoading}
      />
      <Pagination
        onChange={handlePageChange}
        currentPage={currentPage}
        total={userCount}
        resultsPerPage={resultsPerPage}
      />
    </Section>
  );
});

export default Users;
