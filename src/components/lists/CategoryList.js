import React from "react";
import CategoryPlaceholder from "../list-items/CategoryPlaceholder";
import Category from "../list-items/Category";

const CategoryList = ({ isFetching, categories, onDeleteClick }) => {
  const renderPlaceholders = () => {
    let placeholders = [];
    for (let i = 0; i < 5; i++) {
      placeholders.push(<CategoryPlaceholder key={i} />);
    }
    return placeholders;
  };

  const renderCategories = () => {
    return categories.map(category => {
      return (
        <Category
          category={category}
          key={category.id}
          onDeleteClick={onDeleteClick}
        />
      );
    });
  };

  //Display a 'no categories found' message
  if (!isFetching && categories.length === 0) {
    return (
      <div className="error--no-data">
        <span>No categories found</span>
      </div>
    );
  }

  return (
    <ul className="categories">
      {isFetching ? renderPlaceholders() : renderCategories()}
    </ul>
  );
};

export default CategoryList;
