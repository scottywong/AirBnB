import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/Spot/SpotList";
import SpotDetail from "./components/Spot/SpotDetail";
import SpotFormCreate from "./components/Spot/SpotFormCreate";
import SpotFormEdit from "./components/Spot/SpotFormEdit";
import BookingList from "./components/Booking/BookingList";
import BookingDetail from "./components/Booking/BookingDetail";
import BookingFormEdit from "./components/Booking/BookingFormEdit";
import HostPage from "./components/HostPage";
import { useContext } from "react";
import { NavContext } from "./context/Navigation";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";

import './index.css';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isLoaded, setIsLoaded] = useState(false);
  const {showNav, setShowNav} = useContext(NavContext);

  if(location.pathname ==='/host'){
    setShowNav(false)
  }else {
    setShowNav(true)
  }
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <>
    <div id="page-container">
        <Navigation isLoaded={showNav} />
        {isLoaded && (
          <>
          <Switch>
            <Route exact path="/">
              <SpotList />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/host">
              <HostPage />
            </Route>
            <Route path="/spots/new">
              <SpotFormCreate />
            </Route>
            <Route exact path="/spots/:id">
              <SpotDetail />
            </Route>
            <Route path="/spots/:id/edit">
              <SpotFormEdit />
            </Route>
            <Route path="/users/:id/spots">
              <SpotList/>
            </Route>
            <Route path="/users/:id/bookings">
              <BookingList />
            </Route>
            <Route exact path="/bookings/:id">
              <BookingDetail />
            </Route>
            <Route path="/bookings/:id/edit">
              <BookingFormEdit />
            </Route>
          </Switch>
          </>
        )}
    </div>
    <Footer id="footer" />
    </>
  );
}
export default App;