import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";

const App = () => {
  const [token, setToken] = React.useState(null);
  const [userId, setUserId] = React.useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <BrowserRouter className="App">
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login,
          logout,
        }}
      >
        <MainNavigation />
        <main className="main-content">
          <Switch>
            {!token && <Redirect from="/" to="/auth" exact />}
            {!token && <Redirect from="/bookings" to="/auth" exact />}
            {token && <Redirect from="/" to="/events" exact />}
            {token && <Redirect from="/auth" to="/events" exact />}
            {!token && <Route path="/auth" component={AuthPage} />}
            <Route path="/events" component={EventsPage} />
            {token && <Route path="/bookings" component={BookingsPage} />}
          </Switch>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
