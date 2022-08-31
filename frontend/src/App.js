import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList";
import SpotListItem from "./components/SpotList/SpotListItem";
import CreateSpotForm from "./components/CreateSpotForm";
import SpotDetail from "./components/SpotDetail";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SpotList />
          </Route>
          <Route path="/spots/new">
            <CreateSpotForm />
          </Route>
          <Route path="/spots/:id">
            <SpotDetail />
          </Route>
          <Route path="/users/:id/spots">
            <SpotList/>
          </Route>
        </Switch>
      )}
    </>
  );
}
export default App;