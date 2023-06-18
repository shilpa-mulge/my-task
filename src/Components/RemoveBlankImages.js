import Dynamsoft from "dwt";
import React from "react";

const RemoveBlankImages = ({ containerId }) => {
  const removeBlankImages = () => {
    const dwtViewer = Dynamsoft.DWT.GetWebTwain(containerId);

    if (dwtViewer) {
      const imageCount = dwtViewer.HowManyImagesInBuffer;

      for (let i = 0; i < imageCount; i++) {
        const imageIndex = i + 1;
        const isBlank = dwtViewer.GetImageBitDepth(imageIndex) === 1;

        if (isBlank) {
          dwtViewer.RemoveAllSelectedImages();
          // Restart the loop after removing the blank image to recheck the current index
          i = -1;
        }
      }
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <button onClick={removeBlankImages}>Remove Blank Images</button>
    </div>
  );
};

export default RemoveBlankImages;
