import React, { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { css } from '@emotion/css';

import { AuthContext } from '../contexts/Auth';

type Props = {
  path: string;
};

const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PublicRoute: FC<Props> = ({ path, children }) => {
  const { user, authChecked } = useContext(AuthContext);

  if (!authChecked)
    return (
      <div className={container}>
        <CircularProgress />
      </div>
    );

  return user.uid ? (
    <Redirect to="/todo/all" />
  ) : (
    <Route path={path}>{children}</Route>
  );
};

export default PublicRoute;
