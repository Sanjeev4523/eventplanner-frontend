import React from "react";
import "./EventItem.css";

const EventItem = ({ event, authUserId, onDetail }) => {
  return (
    <li className="events__list-item">
      <div>
        <h1>{event.title}</h1>
        <h2>{`$${event.price} - ${new Date(event.date).toLocaleString()}`}</h2>
      </div>
      <div>
        {authUserId === event.creator._id ? (
          <p> You the Owner !</p>
        ) : (
          <button className="btn" onClick={() => onDetail(event._id)}>
            View Details
          </button>
        )}
      </div>
    </li>
  );
};

export default EventItem;
