import React, { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../Contexts/Auth';

type Props = {
  path: string;
};

const PrivateRouter: FC<Props> = ({ path, children }) => {
  const { user } = useContext(AuthContext);

  return user.uid ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRouter;
