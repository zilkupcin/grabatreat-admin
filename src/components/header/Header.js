import React from "react";
import { withRouter } from "react-router-dom";
import HeaderStats from "./HeaderStats";
import { MenuRounded } from "@material-ui/icons";

const logo = require("../../images/screen_logo.png");

const Header = withRouter(
  ({ history, stats, isLoading, onMobileMenuClick }) => {
    const navigateHome = () => {
      history.push("/");
    };

    return (
      <header className="dashboard-header">
        <div className="dashboard-header__stats">
          <div className="app-info" onClick={navigateHome}>
            <img src={logo} className="app-info__logo" alt="logo" />
            <h1 className="app-info__app-title">Grab a Treat</h1>
          </div>
          <HeaderStats stats={stats} isLoading={isLoading} />
        </div>
        <MenuRounded className="mobile-menu" onClick={onMobileMenuClick} />
      </header>
    );
  }
);

export default Header;
