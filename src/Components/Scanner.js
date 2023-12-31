import React, { useState } from "react";
import Dynamsoft from "dwt";
//import "dwt/dist/dynamsoft.webtwain.min.css";
const Scanner = (props) => {
  return (
    <>
      <label
        htmlFor="scannerSelect"
        style={{ fontSize: "30px", fontStyle: "italic" }}
      >
        Select Source:
      </label>
      <br />

      <select
        id="scannerSelect"
        style={{ padding: "10px", margin: "10px", borderRadius: "10px" }}
      >
        {props.scanner.map((source, index) => (
          <option key={index} value={source}>
            {source}
          </option>
        ))}
      </select>
    </>
  );
};

export default Scanner;
