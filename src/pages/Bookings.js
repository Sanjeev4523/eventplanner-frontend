import React from "react";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spinner/Spinner";
import BookingList from "../components//Bookings/BookingList/BookingList";

const Bookings = () => {
  const [loading, setLoading] = React.useState(false);
  const [bookings, setBookings] = React.useState([]);
  const authContext = React.useContext(AuthContext);

  const fetchBookings = () => {
    setLoading(true);
    const requestBody = {
      query: `
              query {
                  bookings {
                      _id
                      createdAt
                      event {
                        _id
                        title
                        description
                        price
                        date
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
        console.log({ resData });
        setBookings(resData.data.bookings);
        setLoading(false);
      })
      .catch((err) => {
        console.log("BOOKINGS FTECHING FAILED");
        console.log(err);
        setLoading(false);
        // throw err;
      });
  };

  const deleteBookingHandler = (bookingId) => {
    setLoading(true);
    const requestBody = {
      query: `
            mutation CancelBooking($id: ID!) {
                cancelBooking(bookingId: $id){
                  _id
                  title
                }
            } 
          `,
      variables: {
        id: bookingId,
      },
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
        console.log({ deletedBooking: resData });
        setBookings((prevBookings) => {
          return prevBookings.filter((booking) => booking._id !== bookingId);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("BOOKINGS DELETION FAILED");
        console.log(err);
        setLoading(false);
        // throw err;
      });
  };

  React.useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <BookingList bookings={bookings} onDelete={deleteBookingHandler} />
      )}{" "}
    </div>
  );
};

export default Bookings;
