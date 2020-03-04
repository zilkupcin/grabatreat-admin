import React from "react";
import Button from "../buttons/Button";
import Dropdown from "../dropdown/Dropdown";

const Filter = ({
  onQuerySubmit,
  onQueryReset,
  onDropdownItemClick,
  onQueryChange,
  resetEnabled,
  isLoading,
  selectedFilter,
  selectedCondition,
  query,
  filters
}) => {
  return (
    <div className="filter">
      <Dropdown
        items={filters}
        selectedItem={selectedFilter}
        className="filter-keys"
        subText="Filter by: "
        onItemClick={onDropdownItemClick}
        name="filter-keys"
      />
      <Dropdown
        items={selectedFilter.conditions}
        selectedItem={selectedCondition}
        className="filter-conditions"
        onItemClick={onDropdownItemClick}
        name="filter-conditions"
      />
      <input
        className="filter-query"
        name="filter-query"
        placeholder={selectedFilter.placeholder}
        type={selectedFilter.type}
        value={query}
        onChange={onQueryChange}
      />
      <Button
        className="action-btn"
        title="Filter"
        isLoading={isLoading}
        onClick={onQuerySubmit}
      />
      {resetEnabled && !isLoading && (
        <Button className="action-btn" title="Reset" onClick={onQueryReset} />
      )}
    </div>
  );
};

export default Filter;
