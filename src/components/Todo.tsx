import React, { FC, useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../contexts/Auth';

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
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { user, setUser } = useContext(AuthContext);
  const { uid } = user;

  const history = useHistory();

  // useEffect(() => {
  //   setDisplayName(user.displayName);
  // }, [user]);

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
        setErrorMessage('タスクの取得に失敗しました。');
      });
  }, [uid]);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push('/');
        setUser({ uid: '', displayName: '' });
      })
      .catch(() => {
        setErrorMessage(
          'ログアウトに失敗しました。時間をおいてログアウトしてみてください。',
        );
      });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={title}>
            ToDo Storage
          </Typography>
          <Typography variant="body1">{user.displayName}</Typography>
          <Button color="inherit" onClick={handleLogout}>
            ログアウト
          </Button>
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
