import React, { FC } from 'react';
import { Button, TextField } from '@material-ui/core';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

const container = css`
  width=100%;
  text-align: center;
`;

const Singup: FC = () => (
  <div className={container}>
    <h2>ToDo Storageにアカウントを作成する</h2>
    <form>
      <div>
        <TextField type="email" placeholder="メールアドレス" margin="normal" />
      </div>
      <div>
        <TextField type="password" placeholder="パスワード" margin="normal" />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          アカウントを作成
        </Button>
      </div>
    </form>
  </div>
);

export default Singup;
