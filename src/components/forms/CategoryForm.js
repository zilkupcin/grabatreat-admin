import React from "react";
import Button from "../buttons/Button";
import ErrorNoData from "../errors/ErrorNoData";
import LabeledInput from "../inputs/LabeledInput";

const CategoryForm = ({ data, newEntry, onInputChange, onSubmit }) => {
  //If it's not a new entry and the object doesn't exist, show an error
  if (!newEntry && data.name === undefined) {
    return <ErrorNoData message="No such entry found" />;
  }

  return (
    <form className="category-form" onSubmit={onSubmit}>
      <div className="input-wrapper">
        <LabeledInput
          value={data.name}
          placeholder=""
          label="Category Name"
          onChange={onInputChange}
          dataKey="name"
          type="text"
        />
        <LabeledInput
          value={data.imageSrc}
          placeholder=""
          label="Image URL"
          onChange={onInputChange}
          dataKey="imageSrc"
          type="text"
        />
        <LabeledInput
          value={data.cheapestItem}
          placeholder=""
          label="Cheapest Item Cost"
          onChange={onInputChange}
          dataKey="cheapestItem"
          type="number"
        />
        <LabeledInput
          value={data.handle}
          placeholder=""
          label="Category Handle"
          onChange={onInputChange}
          dataKey="handle"
          type="text"
        />
        <LabeledInput
          value={data.productCount}
          placeholder=""
          label="Product Count"
          onChange={onInputChange}
          dataKey="productCount"
          type="number"
        />
      </div>
      <Button title="Save" className="action-btn category-form__submit-btn" />
    </form>
  );
};

export default CategoryForm;
