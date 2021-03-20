import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1> Easy Peasy Events </h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          <li>
            <NavLink to="/auth">AUTHENTICATION</NavLink>
          </li>
          <li>
            <NavLink to="/events">EVENTS</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">BOOKINGS</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
