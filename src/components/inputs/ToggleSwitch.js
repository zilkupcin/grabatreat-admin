import React from "react";
import { Switch } from "antd";

const ToggleSwitch = ({ name, checked, onChange, disabled }) => {
  const handleChange = e => {
    const event = {
      target: {
        name: name,
        value: e
      }
    };
    onChange(event);
  };

  return (
    <Switch checked={checked} onChange={handleChange} disabled={disabled} />
  );
};

export default ToggleSwitch;
