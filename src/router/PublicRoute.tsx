import React, { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../contexts/Auth';

type Props = {
  path: string;
};

const PublicRoute: FC<Props> = ({ path, children }) => {
  const { user, authChecked } = useContext(AuthContext);

  if (!authChecked) return <p>ロード中</p>;

  return user.uid ? (
    <Redirect to="/todo/all" />
  ) : (
    <Route path={path}>{children}</Route>
  );
};

export default PublicRoute;
