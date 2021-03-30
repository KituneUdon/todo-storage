import React, { FC } from 'react';
import { Button, TextField } from '@material-ui/core';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

const container = css`
  width=100%;
  text-align: center;
`;

const Login: FC = () => (
  <div className={container}>
    <h2>ToDo Storageにログイン</h2>
    <form>
      <div>
        <TextField type="email" placeholder="メールアドレス" margin="normal" />
      </div>
      <div>
        <TextField type="password" placeholder="パスワード" margin="normal" />
      </div>
      <div>
        <Button variant="contained" color="primary" component={Link} to="/todo">
          ログイン
        </Button>
      </div>
      <p>
        または、<Link to="/singup">メールアドレスを作成</Link>
      </p>
    </form>
  </div>
);

export default Login;
