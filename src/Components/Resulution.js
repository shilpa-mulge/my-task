import React from "react";

const Resulution = ({ resolutions, selectedResolution, onChange }) => {
  return (
    <>
      <div>
        <label htmlFor="resolution">Resolution:</label>
        <select
          id="resolution"
          value={selectedResolution}
          onChange={onChange}
          style={{
            width: "100px",
            margin: "10px",
            padding: "5px",
            borderRadius: "10px",
          }}
        >
          {resolutions.map((resolution, index) => (
            <option key={index} value={resolution}>
              {resolution}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Resulution;
