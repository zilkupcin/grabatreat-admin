import React, { useContext } from "react";
import { NotificationContext } from "../../contexts/NotificationContext";
import Notification from "./Notification";

const Notifications = () => {
  const [notification, setNotification] = useContext(NotificationContext);

  const removeNotification = () => {
    setNotification(null);
  };

  if (!notification) {
    return null;
  }

  return (
    <div className="notifications">
      <Notification
        removeNotification={removeNotification}
        notification={notification}
      />
    </div>
  );
};

export default Notifications;
