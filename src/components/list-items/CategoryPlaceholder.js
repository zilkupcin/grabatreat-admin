import React from "react";

const CategoryPlaceholder = () => {
  return (
    <li className="category-item">
      <div className="category category--placeholder">
        <div className="category__image" />
        <div className="category__info">
          <div className="category__title" />
          <div className="category__count" />
          <div className="category__actions" />
        </div>
      </div>
    </li>
  );
};

export default CategoryPlaceholder;
