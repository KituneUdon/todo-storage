import React, { FC, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { css } from '@emotion/css';

import AddToDo from './AddToDo';
import ToDoList from './ToDoList';

import firebase from '../config/Firebase';

const container = css`
  margin: 0 10px;
`;

const fill = css`
  flex-grow: 1;
`;

const Todo: FC = () => {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setDisplayName(user.displayName ?? '');
    }
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={fill}>
            ToDo Storage
          </Typography>
          <Typography variant="body1">{displayName}</Typography>
        </Toolbar>
      </AppBar>
      <main className={container}>
        <Typography variant="h6">Tasks</Typography>
        <AddToDo />
        <ToDoList />
      </main>
    </>
  );
};

export default Todo;
