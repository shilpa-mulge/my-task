import React, { useState } from "react";

const ShowUi = ({ showUI, setShowUI }) => {
  const handleCheckboxChange = (event) => {
    setShowUI(event.target.checked);
  };
  return (
    <div style={{ margin: "10px" }}>
      <label htmlFor="Showui">
        Show UI:
        <input
          id="Showui"
          type="checkbox"
          checked={showUI}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
};

export default ShowUi;
