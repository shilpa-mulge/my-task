import React from "react";
const AutoFeeder = ({ autoFeederEnabled, onToggleAutoFeeder }) => {
  const handleCheckboxChange = (event) => {
    onToggleAutoFeeder(event.target.checked);
  };

  return (
    <div>
      <label>
        AutoFeeder:
        <input
          type="checkbox"
          checked={autoFeederEnabled}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
};
export default AutoFeeder;
