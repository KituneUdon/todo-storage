import React, { FC, useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { css } from '@emotion/css';

import { AuthContext } from '../Contexts/Auth';

import AddToDo from './AddToDo';
import ToDoList from './ToDoList';

import firebase from '../config/Firebase';

type Tasks = {
  id: string;
  task: string;
};

const container = css`
  margin: 0 10px;
`;

const title = css`
  flex-grow: 1;
`;

const db = firebase.firestore();

const Todo: FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useContext(AuthContext);
  const { uid } = user;

  useEffect(() => {
    setDisplayName(user.displayName);
  }, [user]);

  useEffect(() => {
    const tasksCollection = db.collection('tasks').doc(uid).collection('todo');

    tasksCollection
      .get()
      .then((querySnapshot) => {
        let getTasks: Tasks[] = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id.toString();
          const task = doc.get('task') as string;

          getTasks = [...getTasks, { id, task }];
        });
        setTasks(getTasks);
        getTasks = [];
      })
      .catch(() => {
        setErrorMessage('エラー発生');
      });
  }, [uid]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={title}>
            ToDo Storage
          </Typography>
          <Typography variant="body1">{displayName}</Typography>
        </Toolbar>
      </AppBar>
      <main className={container}>
        <Typography variant="h6">Tasks</Typography>
        {errorMessage && (
          <Typography variant="body1">{errorMessage}</Typography>
        )}
        <AddToDo
          setErrorMessage={setErrorMessage}
          setTasks={setTasks}
          tasks={tasks}
        />
        <ToDoList
          tasks={tasks}
          setTasks={setTasks}
          setErrorMessage={setErrorMessage}
        />
      </main>
    </>
  );
};

export default Todo;
