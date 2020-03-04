import React, { useEffect, useState, useRef } from "react";
import DropdownItemList from "./DropdownItemList";
import { ArrowDropDownRounded, ArrowDropUpRounded } from "@material-ui/icons";

const Dropdown = ({
  className,
  subText,
  items,
  onItemClick,
  selectedItem,
  name
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownNode = useRef();

  const handleClickOutside = e => {
    // Hide dropdown if clicked outside
    if (dropdownNode.current.contains(e.target)) {
      return;
    }

    setDropdownActive(false);
  };

  useEffect(() => {
    //Listen for mousedown clicks to hide the dropdown if clicked outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setDropdownActive(!dropdownActive);
  };

  return (
    <div
      className={
        dropdownActive
          ? `dropdown dropdown--active ${className}`
          : `dropdown ${className}`
      }
      onClick={handleDropdownClick}
      ref={dropdownNode}
    >
      <div className="dropdown__selected-item">
        {dropdownActive ? <ArrowDropUpRounded /> : <ArrowDropDownRounded />}
        <span>{`${subText ? subText : ""}${selectedItem.name}`}</span>
      </div>
      <DropdownItemList items={items} onItemClick={onItemClick} name={name} />
    </div>
  );
};

export default Dropdown;
