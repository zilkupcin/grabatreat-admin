import React, { useCallback } from "react";
import OrderPlaceholderRow from "./rows/OrderPlaceholderRow";
import ErrorNoTableData from "../errors/ErrorNoTableData";
import OrderHeader from "./headers/OrderHeader";
import Table from "./Table";
import OrderRow from "./rows/OrderRow";

const OrderTable = React.memo(
  ({ isLoading, orders, orderCount, onOrderAction, history }) => {
    const CountPlaceholder = () => {
      return (
        <div className="data-count">
          Orders found:
          <div className="count-placeholder" />
        </div>
      );
    };

    const DataCount = () => {
      if (isLoading) return <CountPlaceholder />;

      return <div className="data-count">{`Orders found: ${orderCount}`}</div>;
    };

    const Placeholders = () => {
      let placeholders = [];
      for (let i = 0; i < 10; i++) {
        placeholders.push(<OrderPlaceholderRow key={i} />);
      }
      return placeholders;
    };

    const Orders = useCallback(({ orders }) => {
      if (orders.length === 0) {
        return <ErrorNoTableData message="No orders found" />;
      }

      return orders.map(order => {
        return (
          <OrderRow
            order={order}
            onOrderAction={onOrderAction}
            history={history}
            key={order.id}
          />
        );
      });
    }, []);

    return (
      <React.Fragment>
        <DataCount />
        <Table>
          <OrderHeader />
          <tbody>
            {isLoading ? <Placeholders /> : <Orders orders={orders} />}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
);

export default OrderTable;
