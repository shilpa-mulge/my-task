import React, { useState } from "react";

const ShowUi = ({ showUI, setShowUI }) => {
  const handleCheckboxChange = (event) => {
    setShowUI(event.target.checked);
  };
  return (
    <label>
      Show UI:
      <input type="checkbox" checked={showUI} onChange={handleCheckboxChange} />
    </label>
  );
};

export default ShowUi;
