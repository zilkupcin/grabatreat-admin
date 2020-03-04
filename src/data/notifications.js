export const NOTIFICATION_TYPE_NEGATIVE = "negative";
export const NOTIFICATION_TYPE_POSITIVE = "positive";

export const NOTIFICATION_SUCCESS = {
  message: "Success!",
  type: NOTIFICATION_TYPE_POSITIVE
};
export const NOTIFICATION_ERROR = {
  message: "Error!",
  type: NOTIFICATION_TYPE_NEGATIVE
};

export const buildNotification = (message, type) => {
  return { message, type };
};
