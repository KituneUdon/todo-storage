import React, { FC } from 'react';
import { Button, Typography } from '@material-ui/core';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const container = css({
  width: '100%',
  textAlign: 'center',
});

const Top: FC = () => (
  <>
    <div css={container}>
      <Typography variant="h2">すべてのToDoを１箇所に</Typography>
    </div>
    <div css={container}>
      <Button variant="contained" color="primary" component={Link} to="/login">
        開始
      </Button>
    </div>
  </>
);

export default Top;
