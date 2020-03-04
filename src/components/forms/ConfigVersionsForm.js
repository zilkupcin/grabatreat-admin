import React, { useState } from "react";
import LoadingIndicator from "../loading/LoadingIndicator";
import Button from "../buttons/Button";
import { updateSettings } from "../../api/parseCloud";
import Section from "../sections/Section";
import LabeledInput from "../inputs/LabeledInput";

const ConfigVersionsForm = ({
  settings,
  isLoading,
  onUpdateSuccess,
  onChange,
  onUpdateFailure
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      //Update the app settings in the database before updating the UI
      let payload = [
        { key: "appLatestVersion", value: settings.appLatestVersion },
        { key: "gdprVersion", value: settings.gdprVersion }
      ];
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
      <Section size="third" title="Versions">
        <LoadingIndicator />
      </Section>
    );
  }

  if (!isLoading && settings.appLatestVersion === undefined) {
    return (
      <div className="error--no-data">
        <span>No settings found</span>
      </div>
    );
  }

  const gdprVersion = settings.gdprVersion.replace("v", "");

  return (
    <Section size="third" title="Versions">
      <form className="versions-form" onSubmit={handleSubmit}>
        <LabeledInput
          value={settings.appLatestVersion}
          placeholder="Eg. 1.1"
          label="Latest App Version"
          dataKey="appLatestVersion"
          type="number"
          step="0.01"
          onChange={onChange}
          className="versions-form__input-app"
        />
        <LabeledInput
          value={settings.gdprVersion}
          placeholder="Eg. 1.1"
          label="Gdpr Version"
          dataKey="gdprVersion"
          type="number"
          step="0.01"
          onChange={onChange}
          className="versions-form__input-gdpr"
        />
        <Button className="action-btn" title="Save" isLoading={isUpdating} />
      </form>
    </Section>
  );
};

export default ConfigVersionsForm;
