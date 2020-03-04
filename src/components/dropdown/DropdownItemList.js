import React from "react";
import DropdownItem from "./DropdownItem";

const DropdownItemList = ({ items, onItemClick, name }) => {
  return (
    <ul className="dropdown-list filter-key-list">
      {items.map(item => {
        return (
          <DropdownItem
            item={item}
            onItemClick={onItemClick}
            name={name}
            key={item.key}
          />
        );
      })}
    </ul>
  );
};

export default DropdownItemList;
