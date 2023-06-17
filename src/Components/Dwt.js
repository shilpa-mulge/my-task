import React, { useEffect, useState } from "react";
import Dynamsoft from "dwt";
import Scanner from "./Scanner";
import "./Dwt.css";
import AutoFeeder from "./Auto-Feeder";
import ShowUi from "./ShowUi";
import PixelType from "./PixelType";
const Dwt = (props) => {
  const [autoFeederEnabled, setAutoFeederEnabled] = useState(false);
  const [scanner, setScanner] = useState(null);
  const [showUI, setShowUI] = useState(false);
  const [selectedPixelType, setSelectedPixelType] = useState(
    Dynamsoft.DWT.EnumDWT_PixelType.TWPT_BW
  );
  let DWObject = null;
  const [scannerSources, setScannerSources] = useState([]);
  let containerId = "dwtcontrolContainer";

  function Dynamsoft_OnReady() {
    DWObject = Dynamsoft.DWT.GetWebTwain(containerId);

    //Select Scanner Device
    if (DWObject) {
      const sourceCount = DWObject.GetSourceNames();
      const sources = [];
      for (let i = 0; i < sourceCount.length; i++) {
        sources.push(DWObject.GetSourceNameItems(i));
      }
      setScannerSources(sources);
      setScanner(DWObject);
    }

    //If there are more than 4 images in the viewer, a vertical scroll bar will show.

    DWObject.Viewer.setViewMode(2, 2);
  }

  useEffect(() => {
    Dynamsoft.DWT.RegisterEvent("OnWebTwainReady", () => {
      Dynamsoft_OnReady();
    });
    Dynamsoft.DWT.ProductKey =
      "t01016QAAAK70uaD7MrskBv8DDrqSb2mzh6iqQZCl9dGDleC8v65yKrtaTG3ICfitQRxEz3TUjcuug5KB5w7Z3eOlySkIWM4sDBqGxy90Ls0ZNeX5XPe8qdP4FkYL3VStmWrtBuZ1MDw=";
    Dynamsoft.DWT.ResourcesPath = "/dwt-resources";
    Dynamsoft.DWT.Containers = [
      {
        WebTwainId: "dwtObject",
        ContainerId: containerId,
        Width: "600px",
        Height: "600px",
      },
    ];

    Dynamsoft.DWT.Load();
  }, []);

  /* function acquireImage() {
    if (DWObject) {
      DWObject.SelectSourceAsync()
        .then(() => {
          return DWObject.AcquireImageAsync({
            IfDisableSourceAfterAcquire: true,
          });
        })
        .then((result) => {
          console.log(result);
        })
        .catch((exp) => {
          console.error(exp.message);
        })
        .finally(() => {
          DWObject.CloseSourceAsync().catch((e) => {
            console.error(e);
          });
        });
    }
  } */

  const handleToggleAutoFeeder = (enabled) => {
    setAutoFeederEnabled(enabled);
    if (scanner) {
      // Enable or disable the AutoFeeder based on the checkbox state
      scanner.IfAutoFeed = enabled;
    }
  };

  const handlePixelTypeChange = (pixelType) => {
    setSelectedPixelType(pixelType);

    if (scanner) {
      scanner.PixelType = pixelType; // Set the selected pixel type
    }
  };

  const handleScan = () => {
    // Use Dynamic Web TWAIN API to scan images
    let obj = Dynamsoft.DWT.GetWebTwain(containerId);
    obj.IfShowUI = showUI;
    obj.AcquireImage();
  };
  return (
    <>
      <div className="main">
        <div id={containerId}> </div>
        <div>
          <Scanner scanner={scannerSources} id={containerId} />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <ShowUi setShowUI={setShowUI} />
            <AutoFeeder
              autoFeederEnabled={autoFeederEnabled}
              onToggleAutoFeeder={handleToggleAutoFeeder}
            />
          </div>
          <PixelType
            selectedPixelType={selectedPixelType}
            onPixelTypeChange={handlePixelTypeChange}
          />
          <div>
            <button onClick={handleScan}>Scan</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dwt;
