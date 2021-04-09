import React, { FC } from 'react';
import { Button, Typography } from '@material-ui/core';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

const container = css`
  width: 100%;
  text-align: center;
`;

const Top: FC = () => (
  <>
    <div className={container}>
      <Typography variant="h2">すべてのToDoを１箇所に</Typography>
    </div>
    <div className={container}>
      <Button variant="contained" color="primary" component={Link} to="/login">
        開始
      </Button>
    </div>
  </>
);

export default Top;
