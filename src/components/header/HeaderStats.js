import React from "react";
import Fade from "react-reveal";

const HeaderStats = ({ stats, isLoading }) => {
  const StatsEarnings = () => {
    return (
      <Fade>
        <div className="dashboard-header__balance">
          <span className="dashboard-header__balance-label">
            Today's earnings:{" "}
          </span>
          <span className="dashboard-header__balance-amount">
            {stats.earningsToday !== undefined
              ? `$${stats.earningsToday}`
              : "-"}
          </span>
        </div>
      </Fade>
    );
  };

  const StatsOrderCost = () => {
    return (
      <Fade>
        <div className="dashboard-header__order-balance">
          <span className="dashboard-header__balance-label">
            Today's orders:{" "}
          </span>
          <span className="dashboard-header__balance-amount">
            {stats.orderCostToday !== undefined
              ? `$${stats.orderCostToday}`
              : "-"}
          </span>
        </div>
      </Fade>
    );
  };

  const StatsUserCount = () => {
    return (
      <Fade>
        <div className="dashboard-header__user-count">
          <span className="dashboard-header__user-count-label">
            Total users:{" "}
          </span>
          <span className="dashboard-header__user-count-amount">
            {stats.userCountAllTime !== undefined
              ? stats.userCountAllTime
              : "-"}
          </span>
        </div>
      </Fade>
    );
  };

  const StatsPlaceholder = () => {
    return <div className="dashboard-header__placeholder" />;
  };

  if (isLoading) {
    return (
      <React.Fragment>
        <StatsPlaceholder />
        <StatsPlaceholder />
        <StatsPlaceholder />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <StatsEarnings />
      <StatsOrderCost />
      <StatsUserCount />
    </React.Fragment>
  );
};

export default React.memo(HeaderStats);
