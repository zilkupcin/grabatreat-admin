export const modalTypes = {
  ORDER_REFUND: "ORDER_REFUND",
  ORDER_DELETE: "ORDER_DELETE",
  USER_DELETE: "USER_DELETE",
  CATEGORY_DELETE: "CATEGORY_DELETE"
};

export const modalActions = {
  YES: {
    name: "Yes",
    type: "negative",
    id: "action_yes"
  },
  NO: {
    name: "No",
    type: "positive",
    id: "action_no"
  },
  CANCEL: {
    name: "Cancel",
    type: "positive",
    id: "action_cancel"
  }
};

export const MODAL_ORDER_REFUND = {
  title: "One more thing...",
  message: "Would you also like to delete the order?",
  modalType: modalTypes.ORDER_REFUND,
  actions: [modalActions.YES, modalActions.NO, modalActions.CANCEL]
};

export const MODAL_ORDER_DELETE = {
  title: "One more thing...",
  message: "Are you sure?",
  modalType: modalTypes.ORDER_DELETE,
  actions: [modalActions.YES, modalActions.NO]
};

export const MODAL_USER_DELETE = {
  title: "One more thing...",
  message: "Are you sure?",
  modalType: modalTypes.USER_DELETE,
  actions: [modalActions.YES, modalActions.NO]
};

export const MODAL_CATEGORY_DELETE = {
  title: "One more thing...",
  message: "Are you sure?",
  modalType: modalTypes.CATEGORY_DELETE,
  actions: [modalActions.YES, modalActions.NO]
};
