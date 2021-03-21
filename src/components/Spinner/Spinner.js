import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="lds-circle">
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
