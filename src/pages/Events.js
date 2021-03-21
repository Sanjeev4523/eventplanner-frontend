import React from "react";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";
import "./Events.css";

const Events = () => {
  const [creating, setCreating] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const titleElRef = React.useRef(null);
  const priceElRef = React.useRef(null);
  const dateElRef = React.useRef(null);
  const descriptionElRef = React.useRef(null);
  const authContext = React.useContext(AuthContext);

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const fetchEvents = () => {
    const requestBody = {
      query: `
              query {
                  events{
                      _id
                      title
                      description
                      price
                      date
                      creator {
                        _id
                        email
                      }
                  }
              }
          `,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authContext.token}`,
      },
    })
      .then((res) => {
        if (![200, 201].includes(res.status)) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log({ resData });
        setEvents(resData.data.events);
      })
      .catch((err) => {
        console.log("EVENT FTECHING FAILED");
        console.log(err);
        // throw err;
      });
  };

  const modalConfirmHandler = () => {
    setCreating(false);
    const title = titleElRef.current.value;
    const price = +priceElRef.current.value;
    const date = dateElRef.current.value;
    const description = descriptionElRef.current.value;
    if (
      !(
        title.trim().length ||
        price <= 0 ||
        date.trim().length ||
        description.trim().length
      )
    ) {
      return;
    }
    const event = { title, price, date, description };
    console.log(event);

    const requestBody = {
      query: `
              mutation {
                  createEvent(eventInput: {title: "${title}", description: "${description}", price: "${price}", date:"${date}"}){
                      _id
                      title
                      description
                      price
                      date
                      creator {
                        _id
                        email
                      }
                  }
              }
          `,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext.token}`,
      },
    })
      .then((res) => {
        if (![200, 201].includes(res.status)) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log({resData});
        fetchEvents()
      })
      .catch((err) => {
        console.log("EVENT CREATION FAILED");
        console.log(err);
        // throw err;
      });
  };

  const modalCancelHandler = () => {
    setCreating(false);
  };

  React.useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {creating && (
        <>
          <Backdrop />
          <Modal
            title="Add Event"
            enableCancel
            enableConfirm
            onCancel={modalCancelHandler}
            onConfirm={modalConfirmHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={titleElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={priceElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={dateElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea rows="4" id="description" ref={descriptionElRef} />
              </div>
            </form>
          </Modal>
        </>
      )}
      {authContext.token && (
        <div className="events-control">
          <p> Go On, make your own Events</p>
          <button className="btn" onClick={startCreateEventHandler}>
            Create Event
          </button>
        </div>
      )}
      <ul className="events__list">
        {events.map((event) => (
          <li key={event._id} className="events__list-item">
            {event.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Events;
