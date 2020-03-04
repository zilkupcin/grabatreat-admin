import React from "react";

const LabeledTextarea = ({
  dataKey,
  onChange,
  value,
  label,
  placeholder,
  className,
  isUpdating
}) => {
  const handleInputChange = e => {
    const value = e.target.value;
    onChange(dataKey, value);
  };

  return (
    <div className="input-label-group">
      <label className="input-label-group__label">{label}</label>
      <textarea
        placeholder={placeholder}
        type="text"
        value={value !== undefined ? value : ""}
        onChange={handleInputChange}
        className={className}
        disabled={isUpdating}
      />
    </div>
  );
};

export default LabeledTextarea;
