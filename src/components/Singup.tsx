import React, { FC, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';

import firebase from '../config/Firebase';

const container = css`
  width=100%;
  text-align: center;
`;

const Singup: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const createAccount = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/todo');
      })
      .catch((error: firebase.auth.AuthError) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className={container}>
      {errorMessage && <Typography>{errorMessage}</Typography>}
      <Typography variant="h5">ToDo Storageにアカウントを作成する</Typography>
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
          <Button variant="contained" color="primary" onClick={createAccount}>
            アカウントを作成
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Singup;
