import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import ROUTES from "./routes";
import React from 'react';

import { useAuth } from "./firebase/provider";

import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SignIn from "./pages/auth/Signin";
import Landing from "./pages/Landing";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SignUp from './pages/auth/Signup';
import Artist from './pages/Artist/Artist';
import Artists from './pages/Artist/Artists';
import Songs from './pages/Songs';
import History from './pages/History';
import Favourites from './pages/Favourites';
import Playlist from './pages/Playlist/Playlist';
import AdminTrack from './pages/admin/AdminTrack';
import AdminArtist from './pages/admin/AdminArtist';
import Queue from './pages/Queue';
import SearchResult from './pages/SearchResult';
import AppLayout from './Layout/AppLayout';
import AdminLayout from './Layout/AdminLayout';
import API from './api'

function App() {
  let { currentUser,adminStat } = useAuth();
  let signedInRoutes = (
    <Switch>
      <Route exact path={ROUTES.dashboard} component={Dashboard} />
      <Route exact path={ROUTES.profile} component={Profile} />
      <Route exact path={ROUTES.artist} component={Artist} />
      <Route exact path={ROUTES.artists} component={Artists} />
      <Route exact path={ROUTES.playlist} component={Playlist} />
      <Route exact path={ROUTES.songs} component={Songs} />
      <Route exact path={ROUTES.history} component={History} />
      <Route exact path={ROUTES.favourites} component={Favourites} />
      <Route exact path={ROUTES.queue} component={Queue} />
      <Route exact path={ROUTES.searchResult} component={SearchResult} />
      <Redirect to={ROUTES.dashboard} />
    </Switch>
  );
  let signedOutRoutes = (
    <Switch>
      <Route exact path={ROUTES.signin} component={SignIn} />
      <Route exact path={ROUTES.signup} component={SignUp} />
      <Route exact path={ROUTES.forgotPassword} component={ForgotPassword} />
      <Route exact path={ROUTES.landing} component = {Landing} />
      <Redirect to={ROUTES.landing} />
    </Switch>
  );
  let adminRoutes = (
    <Switch>
      <Route exact path={ROUTES.admintrack} component={AdminTrack} />
      <Route exact path={ROUTES.adminartist} component={AdminArtist} />
      <Redirect to={ROUTES.admintrack} />
    </Switch>
  )
  return (
    <BrowserRouter>
      { 
        currentUser 
        ? adminStat? <> <AdminLayout>{adminRoutes}</AdminLayout></>:<> <AppLayout>{signedInRoutes}</AppLayout> </>
        : <> {signedOutRoutes} </>
      }
    </BrowserRouter>
  );
}
export default App;
