import React, { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { AuthContext } from '../contexts/Auth';

type Props = {
  path: string;
};

const contaier = css({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const PrivateRouter: FC<Props> = ({ path, children }) => {
  const { user, authChecked } = useContext(AuthContext);

  if (!authChecked)
    return (
      <div css={contaier}>
        <CircularProgress />
      </div>
    );

  return user.uid ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRouter;
