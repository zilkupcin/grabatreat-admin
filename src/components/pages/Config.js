import React, { useEffect, useState, useContext } from "react";
import ConfigNetworks from "../config/ConfigNetworks";
import ConfigOptions from "../config/ConfigOptions";
import ConfigVersionsForm from "../forms/ConfigVersionsForm";
import ConfigMiscForm from "../forms/ConfigMiscForm";
import { fetchAppSettings } from "../../api/parseCloud";
import { parseSettings } from "../../utils/parseUtils";
import { NotificationContext } from "../../contexts/NotificationContext";
import {
  buildNotification,
  NOTIFICATION_TYPE_POSITIVE,
  NOTIFICATION_TYPE_NEGATIVE
} from "../../data/notifications";

const Config = () => {
  const [appSettings, setAppSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [notification, setNotification] = useContext(NotificationContext);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const settings = await fetchAppSettings();
      setAppSettings(parseSettings(settings));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleSettingsChange = (dataKey, value) => {
    const settingsCopy = { ...appSettings };

    settingsCopy[dataKey] = value;
    setAppSettings(settingsCopy);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsUpdating(true);
  };

  const handleUpdateSuccess = () => {
    setNotification(
      buildNotification("Config updated!", NOTIFICATION_TYPE_POSITIVE)
    );
  };

  const handleUpdateFailure = error => {
    setNotification(buildNotification(error, NOTIFICATION_TYPE_NEGATIVE));
  };

  return (
    <React.Fragment>
      <ConfigNetworks
        settings={appSettings}
        isLoading={isLoading}
        onChange={handleSettingsChange}
        onUpdateSuccess={handleUpdateSuccess}
        onUpdateFailure={handleUpdateFailure}
      />
      <ConfigOptions
        settings={appSettings}
        isLoading={isLoading}
        onChange={handleSettingsChange}
        onUpdateSuccess={handleUpdateSuccess}
        onUpdateFailure={handleUpdateFailure}
      />
      <ConfigVersionsForm
        settings={appSettings}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onChange={handleSettingsChange}
        onUpdateSuccess={handleUpdateSuccess}
        onUpdateFailure={handleUpdateFailure}
      />
      <ConfigMiscForm
        settings={appSettings}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onChange={handleSettingsChange}
        onUpdateSuccess={handleUpdateSuccess}
        onUpdateFailure={handleUpdateFailure}
      />
    </React.Fragment>
  );
};

export default Config;
