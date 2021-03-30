import React, { FC, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { css } from '@emotion/css';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import 'firebase/firestore';

const container = css`
  width=100%;
  text-align: center;
`;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDaSy9QewHQkjzOIVYKaLPhu1OYJD8sqVY',
  authDomain: 'todo-strage.firebaseapp.com',
  projectId: 'todo-strage',
  storageBucket: 'todo-strage.appspot.com',
  messagingSenderId: '78223297020',
  appId: '1:78223297020:web:d790b56cdd42121ab40a79',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
      .catch((error) => {
        setErrorMessage(error);
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
