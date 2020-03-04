import React, { useState, createContext } from "react";

export const NotificationContext = createContext([{}, function() {}]);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {children}
    </NotificationContext.Provider>
  );
};
