import React from "react";
import * as CONSTANTS from "../constants";
import "./BookingsControl.css";

const BookingsControl = ({ activeOutputType, onChange }) => {
  return (
    <div className="bookings-control">
      <button
        className={activeOutputType === CONSTANTS.LIST ? "active" : ""}
        onClick={() => onChange(CONSTANTS.LIST)}
      >
        List
      </button>
      <button
        className={activeOutputType === CONSTANTS.CHART ? "active" : ""}
        onClick={() => onChange(CONSTANTS.CHART)}
      >
        Chart
      </button>
    </div>
  );
};

export default BookingsControl;
