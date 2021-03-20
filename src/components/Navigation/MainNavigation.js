import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import "./MainNavigation.css";

const MainNavigation = () => {
  const authContext = React.useContext(AuthContext);
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1> Easy Peasy Events </h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          {!authContext.token && (
            <li>
              <NavLink to="/auth">AUTHENTICATION</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/events">EVENTS</NavLink>
          </li>
          {authContext.token && (
            <>
              <li>
                <NavLink to="/bookings">BOOKINGS</NavLink>
              </li>
              <li>
                <button onClick={authContext.logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
