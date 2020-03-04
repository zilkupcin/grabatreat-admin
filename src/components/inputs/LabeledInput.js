import React from "react";

const LabeledInput = ({
  dataKey,
  type,
  onChange,
  value,
  label,
  placeholder,
  step,
  className
}) => {
  const handleInputChange = e => {
    const value = e.target.value;
    onChange(dataKey, value);
  };

  return (
    <div className="input-label-group">
      <label className="input-label-group__label">{label}</label>
      <input
        placeholder={placeholder ? placeholder : ""}
        type={type}
        value={value !== undefined ? value : ""}
        onChange={handleInputChange}
        step={step}
        className={className}
      />
    </div>
  );
};

export default LabeledInput;
