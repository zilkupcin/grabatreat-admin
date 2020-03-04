import React, { useState, useEffect, useContext } from "react";
import Section from "../sections/Section";
import {
  fetchOrdersPagination,
  queryOrdersPagination,
  refundOrder,
  deleteOrder
} from "../../api/parseCloud";
import Filter from "../filter/Filter";
import Pagination from "../pagination/Pagination";
import { ModalContext } from "../../contexts/ModalContext";
import { orderFilters } from "../../data/filters";
import { NotificationContext } from "../../contexts/NotificationContext";
import {
  buildNotification,
  NOTIFICATION_TYPE_NEGATIVE,
  NOTIFICATION_TYPE_POSITIVE
} from "../../data/notifications";
import { withRouter } from "react-router-dom";
import {
  MODAL_ORDER_REFUND,
  MODAL_ORDER_DELETE,
  modalTypes
} from "../../data/modals";
import OrderTable from "../table/OrderTable";

const Orders = withRouter(({ history }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderCount, setOrderCount] = useState(0);
  const [resetEnabled, setResetEnabled] = useState(false);
  const [queryMode, setQueryMode] = useState(false);

  // TODO: Add a results per page selector to this component
  const [resultsPerPage, setResultsPerPage] = useState(20);

  //Filter state
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(orderFilters[0]);
  const [selectedCondition, setSelectedCondition] = useState(
    selectedFilter.conditions[0]
  );

  //Context
  const [modalContent, setModalContent] = useContext(ModalContext);
  const [notification, setNotification] = useContext(NotificationContext);

  useEffect(() => {
    fetchOrders(1);
  }, [queryMode]);

  const handlePageChange = page => {
    setIsLoading(true);
    setCurrentPage(page);
    fetchOrders(page);
  };

  const fetchOrders = async page => {
    setIsLoading(true);

    try {
      let skip = page * resultsPerPage - resultsPerPage;
      let result;

      if (queryMode) {
        result = await queryOrdersPagination(
          skip,
          resultsPerPage,
          selectedFilter.key,
          selectedCondition.key,
          query
        );
      } else {
        result = await fetchOrdersPagination(skip, resultsPerPage);
      }

      setOrders(result.orders);
      setOrderCount(result.count);
      setIsLoading(false);
    } catch (e) {
      setNotification(buildNotification(e.message, NOTIFICATION_TYPE_NEGATIVE));
      setOrders([]);
      setOrderCount(0);
      setIsLoading(false);
    }
  };

  const handleDialogAction = async (modalType, action, payload) => {
    //REFUND ORDER
    if (modalType === modalTypes.ORDER_REFUND) {
      if (action.id === "action_yes") {
        handleRefundOrder(payload, true);
      } else if (action.id === "action_no") {
        handleRefundOrder(payload, false);
      }
    }
    // DELETE ORDER
    else if (modalType === modalTypes.ORDER_DELETE) {
      if (action.id === "action_yes") {
        handleDeleteOrder(payload);
      }
    }
    setModalContent({});
  };

  const handleRefundOrder = async (payload, deleteOrder) => {
    try {
      await refundOrder(payload.orderId, deleteOrder);
      fetchOrders(1);
      setNotification(
        buildNotification("Order refunded!", NOTIFICATION_TYPE_POSITIVE)
      );
    } catch (error) {
      setNotification(
        buildNotification(error.message, NOTIFICATION_TYPE_NEGATIVE)
      );
    }
  };

  const handleDeleteOrder = async payload => {
    try {
      await deleteOrder(payload.orderId);
      fetchOrders(1);
      setNotification(
        buildNotification("Order deleted!", NOTIFICATION_TYPE_POSITIVE)
      );
    } catch (error) {
      setNotification(
        buildNotification(error.message, NOTIFICATION_TYPE_NEGATIVE)
      );
    }
  };

  const handleOrderActionClick = (actionType, orderId) => {
    let content = {};

    if (actionType === "refund") {
      content = MODAL_ORDER_REFUND;
      content.payload = { orderId };
    } else if (actionType === "delete") {
      content = MODAL_ORDER_DELETE;
      content.payload = { orderId };
    }

    content.onAction = handleDialogAction;
    setModalContent(content);
  };

  const handleQuerySubmit = () => {
    const queryKey = selectedFilter.key;
    const queryCondition = selectedCondition.key;
    const queryContent = query;

    if (queryContent === "") {
      setNotification(
        buildNotification("Please enter your query", NOTIFICATION_TYPE_NEGATIVE)
      );
      return;
    }

    setOrderCount(0);
    setQueryMode(true);
    setResetEnabled(true);

    if (queryMode) {
      submitQuery(queryKey, queryCondition, queryContent);
    }
  };

  const submitQuery = async (queryKey, queryCondition, queryContent) => {
    try {
      setIsLoading(true);
      const result = await queryOrdersPagination(
        0,
        resultsPerPage,
        queryKey,
        queryCondition,
        queryContent
      );

      setOrders(result.orders);
      setOrderCount(result.count);
      setIsLoading(false);
    } catch (e) {
      setOrders([]);
      setOrderCount(0);
      setIsLoading(false);
      setNotification(
        buildNotification("An error ocurred", NOTIFICATION_TYPE_NEGATIVE)
      );
    }
  };

  const handleQueryReset = () => {
    setQueryMode(false);
    setQuery("");
    setSelectedFilter(orderFilters[0]);
    if (orderFilters[0].conditions[0] !== undefined) {
      setSelectedCondition(orderFilters[0].conditions[0]);
    }
    setResetEnabled(false);
    setIsLoading(true);
    setOrderCount(0);
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
    <Section size="full" title="Orders">
      <Filter
        resetEnabled={resetEnabled}
        onQuerySubmit={handleQuerySubmit}
        onQueryReset={handleQueryReset}
        onQueryChange={handleQueryChange}
        onDropdownItemClick={handleDropdownItemClick}
        selectedFilter={selectedFilter}
        selectedCondition={selectedCondition}
        filters={orderFilters}
        isLoading={isLoading}
        query={query}
      />
      <OrderTable
        orders={orders}
        orderCount={orderCount}
        isLoading={isLoading}
        onOrderAction={handleOrderActionClick}
        history={history}
      />
      <Pagination
        onChange={handlePageChange}
        currentPage={currentPage}
        total={orderCount}
        resultsPerPage={resultsPerPage}
      />
    </Section>
  );
});

export default Orders;
