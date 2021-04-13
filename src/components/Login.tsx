import React, { FC, useState, useContext } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useHistory } from 'react-router-dom';

import firebase from '../config/Firebase';
import { AuthContext } from '../contexts/Auth';

const container = css({
  width: '100%',
  textAlign: 'center',
});

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userInfo = userCredential.user;
        const user = {
          uid: userInfo?.uid ?? '',
          displayName: userInfo?.displayName ?? '',
        };
        setUser(user);
        history.push('/todo/all');
      })
      .catch(() => {
        setErrorMessage('メールアドレスまたはパスワードが違います');
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div css={container}>
      <Typography variant="h5">ToDo Storageにログイン</Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <form>
        <div>
          <TextField
            type="email"
            placeholder="メールアドレス"
            margin="normal"
            onChange={handleEmailChange}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        </div>
        <div>
          <TextField
            type="password"
            placeholder="パスワード"
            margin="normal"
            onChange={handlePasswordChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            ログイン
          </Button>
        </div>
        <Typography variant="body1">
          または、<Link to="/singup">メールアドレスを作成</Link>
        </Typography>
      </form>
    </div>
  );
};

export default Login;
