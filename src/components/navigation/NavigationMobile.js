import React from "react";
import NavItem from "./NavItem";
import { navItems } from "../../data/navItems";
import { CloseRounded } from "@material-ui/icons";
import MobileStats from "./MobileStats";

import { withRouter } from "react-router-dom";
import { navItemIds } from "../../data/navItems";
import { useContext } from "react";
import { NotificationContext } from "../../contexts/NotificationContext";
import {
  buildNotification,
  NOTIFICATION_TYPE_NEGATIVE
} from "../../data/notifications";
import Parse from "parse";

const NavigationMobile = withRouter(
  ({ isActive, onClose, onSelect, stats, isLoading, history }) => {
    const [notification, setNotification] = useContext(NotificationContext);

    const handleNavClick = item => {
      if (item.id === navItemIds.LOGOUT) {
        if (process.env.REACT_APP_DEMO === "1") {
          if (onSelect) onSelect();
          setNotification(
            buildNotification(
              "Unavailable in demo mode",
              NOTIFICATION_TYPE_NEGATIVE
            )
          );
        } else {
          logOut(item.path);
        }
      } else {
        if (onSelect) {
          onSelect();
        }
        history.push(item.path);
      }
    };

    const logOut = async path => {
      await Parse.User.logOut();
      history.push(path);
    };

    return (
      <nav className={`nav-mobile ${isActive ? "active" : ""}`}>
        <CloseRounded className="nav-mobile__close-icon" onClick={onClose} />
        <MobileStats stats={stats} isLoading={isLoading} />
        <ul className="nav-container--mobile">
          {navItems.map(navItem => {
            return (
              <NavItem
                item={navItem}
                key={navItem.id}
                onSelect={onSelect}
                onItemClick={handleNavClick}
              />
            );
          })}
        </ul>
      </nav>
    );
  }
);

export default NavigationMobile;
