import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import ROUTES from "./routes";
import React from 'react';

import { useAuth } from "./firebase/provider";

import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SignIn from "./pages/auth/Signin";
import Landing from "./pages/Landing";
import SignUp from './pages/auth/Signup';

function App() {
  let { currentUser } = useAuth();
  
  let signedInRoutes = (
    <Switch>
      <Route exact path={ROUTES.dashboard} component={Dashboard} />
      <Route exact path={ROUTES.profile} component={Profile} />
      <Route exact path={ROUTES.settings} component={Settings} />
      <Redirect to={ROUTES.dashboard} />
    </Switch>
  );
  let signedOutRoutes = (
    <Switch>
      <Route exact path={ROUTES.signin} component={SignIn} />
      <Route exact path={ROUTES.signup} component={SignUp} />
      <Route exact path={ROUTES.landing} component = {Landing} />
      <Redirect to={ROUTES.landing} />
    </Switch>
  );
  return (
    <BrowserRouter>
      {
        currentUser 
        ? <> {signedInRoutes} </>
        : <> {signedOutRoutes} </>
      }
    </BrowserRouter>
  );
}
export default App;
