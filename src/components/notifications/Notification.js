import React, { useEffect } from "react";
import { CheckRounded, CloseRounded } from "@material-ui/icons";
import Fade from "react-reveal";

const Notification = ({ notification, removeNotification }) => {
  useEffect(() => {
    // remove the notification after 3 seconds have passed
    const timeout = setTimeout(() => {
      removeNotification();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <Fade top duration={50}>
      <div
        className={`notification ${
          notification.type === "positive"
            ? "notification--positive"
            : "notification--negative"
        }`}
      >
        <div className="notification__content">
          {notification.type === "positive" ? (
            <CheckRounded />
          ) : (
            <CloseRounded />
          )}
          <span className="notification__message">{notification.message}</span>
        </div>
      </div>
    </Fade>
  );
};

export default Notification;
