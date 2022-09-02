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
        </Switch>
      )}
    </>
  );
}
export default App;