import React, { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../Contexts/Auth';

type Props = {
  path: string;
};

const PublicRouter: FC<Props> = ({ path, children }) => {
  const { user } = useContext(AuthContext);

  return user.uid ? (
    <Redirect to="/todo" />
  ) : (
    <Route path={path}>{children}</Route>
  );
};

export default PublicRouter;
