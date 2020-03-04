import React from "react";

const MobileStats = ({ stats, isLoading }) => {
  const StatsEarnings = () => {
    return (
      <div className="mobile-stats__balance">
        <span className="mobile-stats__balance-label">Today's earnings: </span>
        <span className="mobile-stats__balance-amount">
          {stats.earningsToday !== undefined ? `$${stats.earningsToday}` : "-"}
        </span>
      </div>
    );
  };

  const StatsOrderCost = () => {
    return (
      <div className="mobile-stats__order-balance">
        <span className="mobile-stats__balance-label">Today's orders: </span>
        <span className="mobile-stats__balance-amount">
          {stats.orderCostToday !== undefined
            ? `$${stats.orderCostToday}`
            : "-"}
        </span>
      </div>
    );
  };

  const StatsUserCount = () => {
    return (
      <div className="mobile-stats__user-count">
        <span className="mobile-stats__user-count-label">Total users: </span>
        <span className="mobile-stats__user-count-amount">
          {stats.userCountAllTime !== undefined ? stats.userCountAllTime : "-"}
        </span>
      </div>
    );
  };

  const StatsPlaceholder = () => {
    return <div className="mobile-stats__placeholder" />;
  };

  if (isLoading) {
    return (
      <React.Fragment>
        <div className="mobile-stats">
          <StatsPlaceholder />
          <StatsPlaceholder />
          <StatsPlaceholder />
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="mobile-stats">
        <StatsEarnings />
        <StatsOrderCost />
        <StatsUserCount />
      </div>
    </React.Fragment>
  );
};

export default MobileStats;
