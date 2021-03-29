import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { css } from '@emotion/css';

const container = css`
  width: 100%;
  text-align: center;
`;

const Top: FC = () => (
  <>
    <div className={container}>
      <h1>すべてのToDoを１箇所に</h1>
    </div>
    <div className={container}>
      <Button variant="contained" color="primary">
        開始
      </Button>
    </div>
  </>
);

export default Top;
