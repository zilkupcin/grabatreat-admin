export const OBJECT_CATEGORY = "OBJECT_CATEGORY";

export const validate = (objectType, data) => {
  switch (objectType) {
    case OBJECT_CATEGORY:
      return validateCategory(data);
    default:
      return false;
  }
};

const validateCategory = data => {
  if (
    data.name === undefined ||
    data.handle === undefined ||
    data.imageSrc === undefined ||
    data.cheapestItem === undefined ||
    data.productCount === undefined
  ) {
    return [false, "Some fields are empty"];
  } else if (
    data.name.length === 0 ||
    data.imageSrc.length === 0 ||
    data.handle.length === 0
  ) {
    return [false, "Some fields are empty"];
  } else {
    return [true];
  }
};
