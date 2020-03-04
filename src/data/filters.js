const CONDITION_EQUAL_TO = { key: "CONDITION_EQUAL_TO", name: "equal to" };
const CONDITION_LESS_THAN = { key: "CONDITION_LESS_THAN", name: "less than" };
const CONDITION_MORE_THAN = { key: "CONDITION_MORE_THAN", name: "more than" };
const CONDITION_LESS_THAN_OR_EQUAL_TO = {
  key: "CONDITION_LESS_THAN_OR_EQUAL_TO",
  name: "less than or equal to"
};
const CONDITION_MORE_THAN_OR_EQUAL_TO = {
  key: "CONDITION_MORE_THAN_OR_EQUAL_TO",
  name: "more than or equal to"
};
const CONDITION_STARTS_WITH = {
  key: "CONDITION_STARTS_WITH",
  name: "starts with"
};

export const orderFilters = [
  {
    name: "Order Number",
    key: "orderNumber",
    placeholder: "Enter an order number",
    conditions: [
      CONDITION_EQUAL_TO,
      CONDITION_LESS_THAN,
      CONDITION_MORE_THAN,
      CONDITION_LESS_THAN_OR_EQUAL_TO,
      CONDITION_MORE_THAN_OR_EQUAL_TO
    ],
    type: "number"
  },
  {
    name: "Order Cost",
    key: "orderCost",
    placeholder: "Enter order cost",
    conditions: [
      CONDITION_EQUAL_TO,
      CONDITION_LESS_THAN,
      CONDITION_MORE_THAN,
      CONDITION_LESS_THAN_OR_EQUAL_TO,
      CONDITION_MORE_THAN_OR_EQUAL_TO
    ],
    type: "number"
  },
  {
    name: "Item Name",
    key: "productName",
    placeholder: "Enter a product name",
    conditions: [CONDITION_EQUAL_TO, CONDITION_STARTS_WITH],
    type: "text"
  },
  {
    name: "User ID",
    key: "user",
    placeholder: "Enter a user ID",
    conditions: [CONDITION_EQUAL_TO],
    type: "text"
  },
  {
    name: "Email Address",
    key: "email",
    placeholder: "Enter an email address",
    conditions: [CONDITION_EQUAL_TO],
    type: "text"
  }
];

export const userFilters = [
  {
    name: "username",
    key: "username",
    placeholder: "Enter a username",
    conditions: [CONDITION_EQUAL_TO, CONDITION_STARTS_WITH],
    type: "text"
  },
  {
    name: "email",
    key: "email",
    placeholder: "Enter an email address",
    conditions: [CONDITION_EQUAL_TO, CONDITION_STARTS_WITH],
    type: "text"
  },
  {
    name: "ID",
    key: "objectId",
    placeholder: "Enter a user ID",
    conditions: [CONDITION_EQUAL_TO, CONDITION_STARTS_WITH],
    type: "text"
  },
  {
    name: "country",
    key: "regCountry",
    placeholder: "Enter a country code",
    conditions: [CONDITION_EQUAL_TO, CONDITION_STARTS_WITH],
    type: "text"
  },
  {
    name: "points",
    key: "points",
    placeholder: "Enter point amount",
    conditions: [
      CONDITION_EQUAL_TO,
      CONDITION_LESS_THAN,
      CONDITION_MORE_THAN,
      CONDITION_LESS_THAN_OR_EQUAL_TO,
      CONDITION_MORE_THAN_OR_EQUAL_TO
    ],
    type: "number"
  }
];
