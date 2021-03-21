import React from "react";
import EventItem from "./EventItem/EventItem";
import "./EventList.css";

const EventList = ({ events, authUserId, viewDetail }) => {
  return (
    <ul className="events__list">
      {events.map((event) => (
        <EventItem
          key={event._id}
          event={event}
          authUserId={authUserId}
          onDetail={viewDetail}
        />
      ))}
    </ul>
  );
};

export default EventList;
