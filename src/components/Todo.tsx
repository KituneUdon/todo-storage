import React, { FC, useState, useEffect, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { css } from '@emotion/css';
import { Switch, useHistory, Redirect } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';

import dayjs from 'dayjs';
import { AuthContext } from '../contexts/Auth';
import AddTodo from './AddTodo';
import firebase from '../config/Firebase';
import Task from '../types/task';
import ToDoDetail from './TodoDetail';
import Menu from './Menu';
import AllTodo from './AllTodo';
import TodayTodo from './TodayTodo';
import PrivateRoute from '../router/PrivateRoute';
import useUpdateTasks from '../hooks/useUpdateTasks';

const taskDetailWidth = 360;
const menuWidth = 200;

const container = css`
  margin: 10px;
`;

const title = css`
  flex-grow: 1;
`;

const content = css``;

const contentLeftShift = css`
  width: calc(100% - ${taskDetailWidth}px);
  margin-right: ${taskDetailWidth}px;
`;

const contentRightShift = css`
  width: calc(100% - ${menuWidth}px);
  margin-left: ${menuWidth}px;
`;

const db = firebase.firestore();

const Todo: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { updateTasks } = useUpdateTasks(tasks);

  const defaultTaskDetail: Task = {
    id: '',
    task: '',
    expirationDate: dayjs(),
    dueDate: dayjs(),
    memo: '',
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
          const expirationDate = dayjs(doc.get('expirationDate') as string);
          const dueDate = dayjs(doc.get('dueDate') as string);
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
    setTaskDetailOpen(true);
  };

  const handleDrawerClose = () => {
    setTaskDetail(defaultTaskDetail);
    setTaskDetailOpen(false);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleTaskChange = (taskName: string) => {
    const task = {
      id: taskDetail.id,
      task: taskName,
      expirationDate: taskDetail.expirationDate,
      dueDate: taskDetail.dueDate,
      memo: taskDetail.memo,
    };

    setTaskDetail(task);

    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(taskDetail.id)
      .update({ task: event.target.value })
      .catch(() => setErrorMessage('変更に失敗しました。'));

    const newTasks = updateTasks(task);
    setTasks(newTasks);
  };

  const handleTaskDetailExpirationDateChange = (
    expirationDate: dayjs.Dayjs,
  ) => {
    const task = {
      id: taskDetail.id,
      task: taskDetail.task,
      expirationDate,
      dueDate: taskDetail.dueDate,
      memo: taskDetail.memo,
    };

    setTaskDetail(task);
    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(taskDetail.id)
      .update({ expirationDate: expirationDate.format('YYYY-MM-DD') })
      .catch(() => setErrorMessage('変更に失敗しました。'));

    const newTasks = updateTasks(task);
    setTasks(newTasks);
  };

  const handleTaskDetailDueDateChange = (dueDate: dayjs.Dayjs) => {
    const task = {
      id: taskDetail.id,
      task: taskDetail.task,
      expirationDate: taskDetail.expirationDate,
      dueDate,
      memo: taskDetail.memo,
    };

    setTaskDetail(task);
    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(taskDetail.id)
      .update({ dueDate: dueDate.format('YYYY-MM-DD') })
      .catch(() => setErrorMessage('変更に失敗しました。'));

    const newTasks = updateTasks(task);
    setTasks(newTasks);
  };

  const handleTaskDetailMemoChange = (memo: string) => {
    const task = {
      id: taskDetail.id,
      task: taskDetail.task,
      expirationDate: taskDetail.expirationDate,
      dueDate: taskDetail.dueDate,
      memo,
    };

    setTaskDetail(task);
    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(taskDetail.id)
      .update({ memo })
      .catch(() => setErrorMessage('変更に失敗しました。'));

    const newTasks = updateTasks(task);
    setTasks(newTasks);
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

  const taskFinish = (task: Task) => {
    const oldTasks = [...tasks];
    const newTasks = oldTasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);

    db.collection('tasks')
      .doc(uid)
      .collection('finishTodo')
      .doc(task.id)
      .set({
        task: task.task,
      })
      .catch(() => {
        setErrorMessage(
          'ToDoの追加に失敗しました。時間をおいて再度実行してください。',
        );
      });

    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(task.id)
      .delete()
      .catch(() => {
        setErrorMessage(
          'ToDoの完了に失敗しました。時間をおいて再度実行してください。',
        );
      });
  };

  const taskDelete = (task: Task) => {
    const oldTasks = [...tasks];
    const newTasks = oldTasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);

    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(task.id)
      .delete()
      .catch(() => {
        setErrorMessage(
          'ToDoの削除に失敗しました。時間をおいて再度実行してください。',
        );
      });
  };

  return (
    <>
      <AppBar
        position="static"
        className={`${taskDetailOpen ? contentLeftShift : content} ${
          menuOpen ? contentRightShift : content
        }`}
      >
        <Toolbar>
          {!menuOpen && (
            <IconButton onClick={handleMenuOpen} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={title}>
            ToDo Storage
          </Typography>
          <Typography variant="body1">{user.displayName}</Typography>
          <Button color="inherit" onClick={handleLogout}>
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
      <main
        className={`${
          taskDetailOpen ? contentLeftShift : content
        } ${container} ${menuOpen ? contentRightShift : content}`}
      >
        <Typography variant="h6">Tasks</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <AddTodo
          setErrorMessage={setErrorMessage}
          setTasks={setTasks}
          tasks={tasks}
        />
        <Switch>
          <PrivateRoute path="/todo/all">
            <AllTodo
              tasks={tasks}
              taskFinish={taskFinish}
              taskDelete={taskDelete}
              openDrawer={handleDrawerOpen}
            />
          </PrivateRoute>
          <PrivateRoute path="/todo/today">
            <TodayTodo
              tasks={tasks}
              taskFinish={taskFinish}
              taskDelete={taskDelete}
              openDrawer={handleDrawerOpen}
            />
          </PrivateRoute>
          <PrivateRoute path="/todo">
            <Redirect to="/todo/all" />
          </PrivateRoute>
        </Switch>
      </main>
      <ToDoDetail
        oepn={taskDetailOpen}
        taskDetail={taskDetail}
        drawerClose={handleDrawerClose}
        taskChange={handleTaskChange}
        expirationDateChange={handleTaskDetailExpirationDateChange}
        dueDateChange={handleTaskDetailDueDateChange}
        memoChange={handleTaskDetailMemoChange}
      />
      <Menu menuOpen={menuOpen} handleMenuClose={handleMenuClose} />
    </>
  );
};

export default Todo;
