import React from "react";
import { withRouter } from "react-router-dom";

const Category = withRouter(({ category, history, onDeleteClick }) => {
  //Format the image URL
  let categoryImage = category.get("imageSrc");
  categoryImage = categoryImage.replace(/\\/g, "");

  const handleEditClick = () => {
    history.push(`/categories/edit/${category.id}`);
  };

  const handleDeleteClick = () => {
    onDeleteClick(category.id);
  };

  return (
    <li className="category-item">
      <div className="category">
        <div className="category__image-container">
          <img className="category__image" src={categoryImage} alt="category" />
        </div>
        <div className="category__info">
          <h4 className="category__title">{category.get("name")}</h4>
          <span className="category__count">{`${category.get(
            "productsCount"
          )} Items`}</span>
          <div className="category__actions">
            <span className="category__action" onClick={handleEditClick}>
              Edit
            </span>
            <span
              className="category__action category__action--negative"
              onClick={handleDeleteClick}
            >
              Delete
            </span>
          </div>
        </div>
      </div>
    </li>
  );
});

export default Category;
