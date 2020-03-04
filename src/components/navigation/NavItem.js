import React from "react";
import {
  HomeRounded,
  SettingsRounded,
  ShoppingBasketRounded,
  FolderRounded,
  ExitToAppRounded,
  PersonRounded
} from "@material-ui/icons";
import { navItemIds } from "../../data/navItems";

const NavItem = ({ item, onItemClick }) => {
  const handleNavClick = () => {
    onItemClick(item);
  };

  const getNavItem = () => {
    switch (item.id) {
      case navItemIds.HOME:
        return <HomeRounded />;
      case navItemIds.USERS:
        return <PersonRounded />;
      case navItemIds.CONFIG:
        return <SettingsRounded />;
      case navItemIds.CATEGORIES:
        return <FolderRounded />;
      case navItemIds.ORDERS:
        return <ShoppingBasketRounded />;
      case navItemIds.LOGOUT:
        return <ExitToAppRounded />;
      default:
        return null;
    }
  };

  const path = window.location.pathname;
  const pathSelected = path === item.path || path.includes(`${item.path}/`);

  return (
    <li
      className={pathSelected ? "nav-item nav-item--selected" : "nav-item"}
      onClick={handleNavClick}
    >
      <div className="nav-item__details">
        {getNavItem()}
        <span className="nav-item__title">{item.title}</span>
      </div>
      {pathSelected && <div className="nav-item__decoration" />}
    </li>
  );
};

export default NavItem;
