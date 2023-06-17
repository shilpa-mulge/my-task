import React, { useEffect, useState, useRef } from "react";
import Dynamsoft from "dwt";
import Scanner from "./Scanner";
import "./Dwt.css";
import AutoFeeder from "./Auto-Feeder";
import ShowUi from "./ShowUi";
import PixelType from "./PixelType";
import Resulution from "./Resulution";
const Dwt = (props) => {
  const containerRef = useRef(null);
  const [scanner, setScanner] = useState(null);
  //Auto feed State
  const [autoFeederEnabled, setAutoFeederEnabled] = useState(false);
  //showUI state
  const [showUI, setShowUI] = useState(false);

  //Pixel state
  const [selectedPixelType, setSelectedPixelType] = useState(
    Dynamsoft.DWT.EnumDWT_PixelType.TWPT_BW
  );

  //REsolution states

  const [availableResolutions, setAvailableResolutions] = useState([]);
  const [selectedResolution, setSelectedResolution] = useState("");

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

      const scanner = Dynamsoft.DWT.GetWebTwain("dwtcontrolContainer");
      scanner.OpenSource();
      scanner.getCapabilities(
        function (result) {
          for (var i = 0; i < result.length; i++) {
            if (
              result[i].capability.value ===
              Dynamsoft.DWT.EnumDWT_Cap.ICAP_XRESOLUTION
            ) {
              if (result[i].conType.label === "TWON_ENUMERATION") {
                // If the capability's Vaule Type is Enumeration
                let dpi = result[i].values;
                // The list of supported resolution.
                setAvailableResolutions(dpi);
              }
            }
          }
        },
        function (error) {
          console.log(error);
        }
      );
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

  const handleResolutionChange = (event) => {
    const scanner = Dynamsoft.DWT.GetWebTwain("dwtcontrolContainer");
    scanner.Resolution = event.target.value;
    setSelectedResolution(event.target.value);
  };

  /*  const handleScan = () => {
    // Use Dynamic Web TWAIN API to scan images
    let obj = Dynamsoft.DWT.GetWebTwain(containerId);
    obj.IfShowUI = showUI;
    obj.AcquireImage();
  }; */

  // Handle the scan and save functionality
  const scanAndSave = () => {
    const scanner = Dynamsoft.DWT.GetWebTwain("dwtcontrolContainer");

    // Acquire images from the scanner
    scanner.IfShowUI = showUI;
    scanner.AcquireImage();

    // Save acquired images as a multi-page PDF
    const result = scanner.SaveAllAsPDF("./output/result.pdf");
    if (result) {
      console.log("All Images saved as PDF.");
    } else {
      console.error("Failed to save All images as PDF.");
    }
  };

  // Handle the scan and save functionality
  const scanAndSave2 = () => {
    const dwObject = Dynamsoft.DWT.GetWebTwain("dwtcontrolContainer");
    dwObject.IfShowUI = showUI;

    let imageCount = dwObject.HowManyImagesInBuffer;

    // Save each scanned image as a separate PDF file
    for (let i = 0; i < imageCount; i++) {
      dwObject.SaveAsPDF(
        "/output/" + (i + 1) + ".pdf",
        i,
        () => alert("Image saved as PDF."),
        (errorCode, errorString) =>
          alert("Error saving image as PDF:", errorCode, errorString)
      );
    }
    dwObject.AcquireImage();
  };

  return (
    <>
      <div className="main">
        <div id={containerId} ref={containerRef}>
          {" "}
        </div>
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
          <Resulution
            resolutions={availableResolutions}
            selectedResolution={selectedResolution}
            onChange={handleResolutionChange}
          />
          <div>
            <button onClick={scanAndSave}>Scan and Save 1</button>
          </div>
          <div>
            <button onClick={scanAndSave2}>Scan and Save 2</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dwt;
