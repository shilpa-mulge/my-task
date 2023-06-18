import React from "react";
import Dynamsoft from "dwt";
const RemoveAllImages = ({ containerId }) => {
  const removeImageHandler = () => {
    const dwObject = Dynamsoft.DWT.GetWebTwain(containerId);
    dwObject.RemoveAllImages();
  };
  return (
    <div style={{ margin: "10px" }}>
      <button onClick={removeImageHandler}>Remove All Images</button>
    </div>
  );
};

export default RemoveAllImages;
