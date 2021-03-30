import React, { FC } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { css } from '@emotion/css';

import AddToDo from './AddToDo';
import ToDoList from './ToDoList';

const container = css`
  margin: 0 10px;
`;

const Todo: FC = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">ToDo Storage</Typography>
      </Toolbar>
    </AppBar>
    <main className={container}>
      <Typography variant="h6">Tasks</Typography>
      <AddToDo />
      <ToDoList />
    </main>
  </>
);

export default Todo;
