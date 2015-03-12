'use strict';

import React from 'react';
import Router from 'react-router';
import Main from '../components/Main';
import Home from '../components/Home';
import Login from '../components/login-register/Login';
import Logout from '../components/login-register/Logout';
import Register from '../components/login-register/Register';
import GameBox from '../components/GameBox';
import Schedule from '../components/Schedule';
import AddGame from '../components/secure/AddGame';

let { Route, DefaultRoute, NotFoundRoute, Link, Redirect } = Router;

var routes = (
  <Route handler={Main} path='/'>
    <DefaultRoute name='home' handler={Home} />
    <Route name='login' handler={Login} />
    <Route name='logout' handler={Logout} />
    <Route name='register' handler={Register} />
    <Route name='gamebox' handler={GameBox} />
    <Route name='schedule' path="/schedule/:team" handler={Schedule} />
    <Route name='addgame' path="/addgame/:team" handler={AddGame} />
    <Redirect from="home" to="/" />
  </Route>
);

export default routes;
