import React, { useState } from "react";
import LoadingIndicator from "../loading/LoadingIndicator";
import ToggleSwitch from "../inputs/ToggleSwitch";
import { updateSettings } from "../../api/parseCloud";
import Section from "../sections/Section";

const ConfigNetworks = ({
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
      let payload = [{ key, value }];

      //Update settings in the database before updating the UI
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
      <Section size="third" title="Advertising Networks">
        <LoadingIndicator />
      </Section>
    );
  }

  if (!isLoading && settings.adGateCpi === undefined) {
    return (
      <div className="error--no-data">
        <span>No settings found</span>
      </div>
    );
  }

  return (
    <Section size="third" title="Advertising Networks">
      <ul className="switches">
        <li className="switch">
          <span className="switch__label">AdGem CPI</span>
          <ToggleSwitch
            checked={settings.adGateCpi ? true : false}
            onChange={handleSwitchChange}
            name="adGateCpi"
            disabled={isUpdating}
          />
        </li>
        <li className="switch">
          <span className="switch__label">Ogads CPI</span>
          <ToggleSwitch
            checked={settings.installsOn ? true : false}
            onChange={handleSwitchChange}
            name="installsOn"
            disabled={isUpdating}
          />
        </li>
        <li className="switch">
          <span className="switch__label">AdscendMedia</span>
          <ToggleSwitch
            checked={settings.adscendOn ? true : false}
            onChange={handleSwitchChange}
            name="adscendOn"
            disabled={isUpdating}
          />
        </li>
        <li className="switch">
          <span className="switch__label">TheoremReach</span>
          <ToggleSwitch
            checked={settings.theOremOn ? true : false}
            onChange={handleSwitchChange}
            name="theOremOn"
            disabled={isUpdating}
          />
        </li>
        <li className="switch">
          <span className="switch__label">Pollfish Surveys</span>
          <ToggleSwitch
            checked={settings.pollfishOn ? true : false}
            onChange={handleSwitchChange}
            name="pollfishOn"
            disabled={isUpdating}
          />
        </li>
      </ul>
    </Section>
  );
};

export default ConfigNetworks;
