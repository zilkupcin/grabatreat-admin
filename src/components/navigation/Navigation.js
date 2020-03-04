import React from "react";
import { navItems } from "../../data/navItems";
import NavItem from "./NavItem";
import Slide from "react-reveal";

import { withRouter } from "react-router-dom";
import { navItemIds } from "../../data/navItems";
import { useContext } from "react";
import { NotificationContext } from "../../contexts/NotificationContext";
import {
  buildNotification,
  NOTIFICATION_TYPE_NEGATIVE
} from "../../data/notifications";
import Parse from "parse";

const Navigation = withRouter(({ history }) => {
  const [notification, setNotification] = useContext(NotificationContext);

  const handleNavClick = item => {
    if (item.id === navItemIds.LOGOUT) {
      if (process.env.REACT_APP_DEMO === "1") {
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
      history.push(item.path);
    }
  };

  const logOut = async path => {
    await Parse.User.logOut();
    history.push(path);
  };

  return (
    <Slide left>
      <nav className="nav">
        <ul className="nav-container">
          {navItems.map(navItem => {
            return (
              <NavItem
                item={navItem}
                key={navItem.id}
                onItemClick={handleNavClick}
              />
            );
          })}
        </ul>
      </nav>
    </Slide>
  );
});

export default Navigation;
