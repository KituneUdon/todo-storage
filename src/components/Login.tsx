import React, { FC, useState, useContext } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { css } from '@emotion/css';
import { Link, useHistory } from 'react-router-dom';

import firebase from '../config/Firebase';
import { AuthContext } from '../Contexts/Auth';

const container = css`
  width=100%;
  text-align: center;
`;

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
        history.push('/todo');
      })
      .catch(() => {
        setErrorMessage('メールアドレスまたはパスワードが違います');
      });
  };

  return (
    <div className={container}>
      <h2>ToDo Storageにログイン</h2>
      {errorMessage && <Typography variant="h5">{errorMessage}</Typography>}
      <form>
        <div>
          <TextField
            type="email"
            placeholder="メールアドレス"
            margin="normal"
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <TextField
            type="password"
            placeholder="パスワード"
            margin="normal"
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            ログイン
          </Button>
        </div>
        <p>
          または、<Link to="/singup">メールアドレスを作成</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
