import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './Contexts/Auth';

import PrivateRoute from './Router/PrivateRouter';

import Top from './components/Top';
import Login from './components/Login';
import Todo from './components/Todo';
import NotFound from './components/NotFound';
import Singup from './components/Singup';

const App: FC = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Top />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/singup">
          <Singup />
        </Route>
        <PrivateRoute path="/Todo">
          <Todo />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
