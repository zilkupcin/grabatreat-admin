import React from "react";

const DropdownItem = ({ item, onItemClick, name }) => {
  const handleItemClick = () => {
    onItemClick(name, item);
  };

  return (
    <li onClick={handleItemClick} className="dropdown-list__item">
      {item.name}
    </li>
  );
};

export default DropdownItem;
