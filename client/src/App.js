import React, {Component} from 'react';
import Register from './auth/register';
import Login from './auth/login';
import Home from './auth/home';
import {Switch, Route} from 'react-router-dom';
import ProtectedRouter from './auth/protected';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRouter exact path="/home" component={Home} />
      </Switch>
      <ToastContainer/>
    </div>
  );
}

export default App;
