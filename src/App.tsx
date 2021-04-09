import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/Auth';

// import PrivateRouter from './router/PrivateRouter';
// import PublicRouter from './router/PublicRouter';

import Top from './components/Top';
import Login from './components/Login';
import Todo from './components/Todo';
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
        <PrivateRoute path="/todo">
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
