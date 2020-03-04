import React, { useState } from "react";
import LoadingIndicator from "../loading/LoadingIndicator";
import Button from "../buttons/Button";
import { updateSettings } from "../../api/parseCloud";
import Section from "../sections/Section";
import LabeledTextarea from "../inputs/LabeledTextarea";

const ConfigMiscForm = ({
  settings,
  isLoading,
  onChange,
  onUpdateSuccess,
  onUpdateFailure
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      //Update the settings in the database before updating the UI
      let payload = [{ key: "updateMessage", value: settings.updateMessage }];
      await updateSettings(payload);

      //Update the UI
      onUpdateSuccess();
      setIsUpdating(false);
    } catch (e) {
      setIsUpdating(false);
      onUpdateFailure(e.message);
    }
  };

  if (isLoading) {
    return (
      <Section size="third" title="Misc">
        <LoadingIndicator />
      </Section>
    );
  }

  if (!isLoading && settings.updateMessage === undefined) {
    return (
      <div className="error--no-data">
        <span>No settings found</span>
      </div>
    );
  }

  return (
    <Section size="third" title="Misc">
      <form className="misc-form" onSubmit={handleSubmit}>
        <LabeledTextarea
          className="misc-form__textarea-message"
          dataKey="updateMessage"
          placeholder="Eg. Please update the app by going to the Google Play Store"
          value={settings.updateMessage}
          onChange={onChange}
          isUpdating={isUpdating}
        />
        <Button className="action-btn" title="Save" isLoading={isUpdating} />
      </form>
    </Section>
  );
};

export default ConfigMiscForm;
