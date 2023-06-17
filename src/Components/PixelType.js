import React from "react";
import Dynamsoft from "dwt";
const PixelType = ({ selectedPixelType, onPixelTypeChange }) => {
  const handleRadioChange = (event) => {
    onPixelTypeChange(event.target.value);
  };

  return (
    <>
      <h5>Pixel Type:</h5>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          margin: "10px",
        }}
      >
        <label>
          <input
            type="radio"
            value={Dynamsoft.DWT.EnumDWT_PixelType.TWPT_BW}
            checked={
              selectedPixelType == Dynamsoft.DWT.EnumDWT_PixelType.TWPT_BW
            }
            onChange={handleRadioChange}
          />
          Black & White
        </label>
        <label>
          <input
            type="radio"
            value={Dynamsoft.DWT.EnumDWT_PixelType.TWPT_GRAY}
            checked={
              selectedPixelType == Dynamsoft.DWT.EnumDWT_PixelType.TWPT_GRAY
            }
            onChange={handleRadioChange}
          />
          Gray
        </label>
        <label>
          <input
            type="radio"
            value={Dynamsoft.DWT.EnumDWT_PixelType.TWPT_RGB}
            checked={
              selectedPixelType == Dynamsoft.DWT.EnumDWT_PixelType.TWPT_RGB
            }
            onChange={handleRadioChange}
          />
          Color
        </label>
      </div>
    </>
  );
};

export default PixelType;
