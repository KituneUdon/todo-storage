import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/Auth';

import Top from './components/Top';
import Login from './components/Login';
import Tasks from './components/Tasks';
import NotFound from './components/NotFound';
import Singup from './components/Singup';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';

const App: FC = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Top />
        </Route>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/singup">
          <Singup />
        </PublicRoute>
        <PrivateRoute path="/tasks">
          <Tasks />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
