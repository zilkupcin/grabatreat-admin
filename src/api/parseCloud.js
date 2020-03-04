import Parse from "parse";

export const login = async (username, password) => {
  return await Parse.Cloud.run("login", { username, password });
};

export const fetchCategories = async () => {
  return await Parse.Cloud.run("fetchCategories");
};

export const fetchCountryBreakdown = async () => {
  return await Parse.Cloud.run("fetchCountryBreakdown");
};

export const fetchDailyBreakdown = async () => {
  return await Parse.Cloud.run("fetchUserBreakdown");
};

export const fetchAppSettings = async () => {
  return await Parse.Cloud.run("fetchAppSettingsAdmin");
};

export const fetchOrdersPagination = async (skip, limit) => {
  if (!skip) skip = 0;
  if (!limit) limit = 100;
  return await Parse.Cloud.run("fetchOrders", { skip, limit });
};

export const fetchUsersPagination = async (skip, limit) => {
  if (!skip) skip = 0;
  if (!limit) limit = 100;
  return await Parse.Cloud.run("fetchUsers", { skip, limit });
};

export const queryOrdersPagination = async (
  skip,
  limit,
  key,
  condition,
  query
) => {
  if (!skip) skip = 0;
  if (!limit) limit = 100;

  // Convert string to a number
  if (key === "orderNumber" || key === "orderCost") {
    query = parseInt(query);
  }

  return await Parse.Cloud.run("queryOrders", {
    skip,
    limit,
    key,
    condition,
    query
  });
};

export const queryUsersPagination = async (
  skip,
  limit,
  key,
  condition,
  query
) => {
  if (!skip) skip = 0;
  if (!limit) limit = 100;

  // Convert string to a number
  if (key === "points") {
    query = parseInt(query);
  }

  return await Parse.Cloud.run("queryUsers", {
    skip,
    limit,
    key,
    condition,
    query
  });
};

export const refundOrder = async (orderId, shouldDelete) => {
  return await Parse.Cloud.run("refundOrder", {
    id: orderId,
    shouldDelete: shouldDelete
  });
};

export const deleteOrder = async orderId => {
  return await Parse.Cloud.run("deleteOrder", {
    id: orderId
  });
};

export const deleteUser = async userId => {
  return await Parse.Cloud.run("deleteUser", {
    id: userId
  });
};

export const fetchOrderCount = async () => {
  return await Parse.Cloud.run("fetchOrderCount");
};

export const fetchCategoryById = async categoryId => {
  return await Parse.Cloud.run("fetchCategoryById", { id: categoryId });
};

export const fetchUserById = async userId => {
  return await Parse.Cloud.run("fetchUserById", { id: userId });
};

export const updateSettings = async payload => {
  return await Parse.Cloud.run("updateSettings", { payload });
};
