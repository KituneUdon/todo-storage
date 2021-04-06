import React, { FC, useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../contexts/Auth';
import AddToDo from './AddToDo';
import ToDoList from './ToDoList';
import firebase from '../config/Firebase';
import Task from '../types/task';
import ToDoDetail from './ToDoDetail';

const container = css`
  margin: 0 10px;
`;

const title = css`
  flex-grow: 1;
`;

const db = firebase.firestore();

const Todo: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const defaultTaskDetail: Task = {
    id: '',
    task: '',
  };

  const [taskDetail, setTaskDetail] = useState(defaultTaskDetail);
  const { user, setUser } = useContext(AuthContext);
  const { uid } = user;

  const history = useHistory();

  useEffect(() => {
    const tasksCollection = db.collection('tasks').doc(uid).collection('todo');

    tasksCollection
      .get()
      .then((querySnapshot) => {
        let getTasks: Task[] = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id.toString();
          const task = doc.get('task') as string;
          const expirationDate = doc.get('expirationDate') as string;
          const dueDate = doc.get('dueDate') as string;
          const memo = doc.get('memo') as string;

          getTasks = [...getTasks, { id, task, expirationDate, dueDate, memo }];
        });
        setTasks(getTasks);
        getTasks = [];
      })
      .catch(() => {
        setErrorMessage('タスクの取得に失敗しました。');
      });
  }, [uid]);

  const handleDrawerOpen = (task: Task) => {
    setTaskDetail(task);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setTaskDetail(defaultTaskDetail);
    setOpen(false);
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDetail({
      id: taskDetail.id,
      task: event.target.value,
      expirationDate: taskDetail.expirationDate,
      dueDate: taskDetail.dueDate,
      memo: taskDetail.memo,
    });
    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(taskDetail.id)
      .update({ task: event.target.value })
      .catch(() => setErrorMessage('変更に失敗しました。'));
  };

  const handleTaskDetailExpirationDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTaskDetail({
      id: taskDetail.id,
      task: taskDetail.task,
      expirationDate: event.target.value,
      dueDate: taskDetail.dueDate,
      memo: taskDetail.memo,
    });
    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(taskDetail.id)
      .update({ expirationDate: event.target.value })
      .catch(() => setErrorMessage('変更に失敗しました。'));
  };

  const handleTaskDetailDueDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTaskDetail({
      id: taskDetail.id,
      task: taskDetail.task,
      expirationDate: taskDetail.expirationDate,
      dueDate: event.target.value,
      memo: taskDetail.memo,
    });
    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(taskDetail.id)
      .update({ dueDate: event.target.value })
      .catch(() => setErrorMessage('変更に失敗しました。'));
  };

  const handleTaskDetailMemoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTaskDetail({
      id: taskDetail.id,
      task: taskDetail.task,
      expirationDate: taskDetail.expirationDate,
      dueDate: taskDetail.dueDate,
      memo: event.target.value,
    });
    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(taskDetail.id)
      .update({ memo: event.target.value })
      .catch(() => setErrorMessage('変更に失敗しました。'));
  };

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
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <AddToDo
          setErrorMessage={setErrorMessage}
          setTasks={setTasks}
          tasks={tasks}
        />
        <ToDoList
          tasks={tasks}
          setTasks={setTasks}
          setErrorMessage={setErrorMessage}
          openDrawer={handleDrawerOpen}
        />
      </main>
      <ToDoDetail
        oepn={open}
        taskDetail={taskDetail}
        drawerClose={handleDrawerClose}
        taskChange={handleTaskChange}
        expirationDateChange={handleTaskDetailExpirationDateChange}
        dueDateChange={handleTaskDetailDueDateChange}
        memoChange={handleTaskDetailMemoChange}
      />
    </>
  );
};

export default Todo;
