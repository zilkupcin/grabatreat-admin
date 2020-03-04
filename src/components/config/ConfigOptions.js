import React, { useState } from "react";
import LoadingIndicator from "../loading/LoadingIndicator";
import ToggleSwitch from "../inputs/ToggleSwitch";
import { updateSettings } from "../../api/parseCloud";
import Section from "../sections/Section";

const ConfigOptions = ({
  settings,
  isLoading,
  onChange,
  onUpdateSuccess,
  onUpdateFailure
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSwitchChange = async e => {
    setIsUpdating(true);
    const key = e.target.name;
    const value = e.target.value;

    try {
      //Update settings in the database before updating the UI
      let payload = [{ key, value }];
      await updateSettings(payload);

      //Show a 'success' notification
      onUpdateSuccess();

      //Update the UI
      setIsUpdating(false);
      onChange(key, value);
    } catch (e) {
      setIsUpdating(false);
      onUpdateFailure(e.message);
    }
  };

  if (isLoading) {
    return (
      <Section size="third" title="General Options">
        <LoadingIndicator />
      </Section>
    );
  }

  if (!isLoading && settings.maintenanceMode === undefined) {
    return (
      <div className="error--no-data">
        <span>No settings found</span>
      </div>
    );
  }

  return (
    <Section size="third" title="General Options">
      <ul className="switches">
        <li className="switch">
          <span className="switch__label">Maintenance Mode</span>
          <ToggleSwitch
            checked={settings.maintenanceMode ? true : false}
            onChange={handleSwitchChange}
            name="maintenanceMode"
            disabled={isUpdating}
          />
        </li>
        <li className="switch">
          <span className="switch__label">App Recently Updated</span>
          <ToggleSwitch
            checked={settings.justReleasedNew ? true : false}
            onChange={handleSwitchChange}
            name="justReleasedNew"
            disabled={isUpdating}
          />
        </li>
      </ul>
    </Section>
  );
};

export default ConfigOptions;
