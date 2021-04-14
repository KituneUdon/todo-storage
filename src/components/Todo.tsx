import React, { FC, useState, useEffect, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
import useFirestoreUpdateTask from '../hooks/useFirestoreUpdateTask';
import useFinishTask from '../hooks/useFinishTask';
import useDeleteTask from '../hooks/useDeleteTask';

const taskDetailWidth = 360;
const menuWidth = 200;

const container = css({
  margin: '10px',
});

const titleStyle = css({
  flexGrow: 1,
});

const content = css({});

const contentLeftShift = css({
  width: `calc(100% - ${taskDetailWidth}px)`,
  marginRight: `${taskDetailWidth}px`,
});

const contentRightShift = css({
  width: `calc(100% - ${menuWidth}px)`,
  marginLeft: `${menuWidth}px`,
});

const db = firebase.firestore();

const Todo: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { updateTasks } = useUpdateTasks(tasks);

  const defaultTaskDetail: Task = {
    id: '',
    title: '',
    expirationDate: dayjs(),
    dueDate: dayjs(),
    memo: '',
    hasRepeat: false,
  };

  const [taskDetail, setTaskDetail] = useState(defaultTaskDetail);
  const { user, setUser } = useContext(AuthContext);
  const { uid } = user;

  const {
    firestoreUpdateTitle,
    firestoreUpdateExpirationDate,
    firestoreUpdateDueDate,
    firestoreUpdateMemo,
    firestoreUpdateHasRepeat,
  } = useFirestoreUpdateTask(uid);
  const { finishTask, finishRepeatTask } = useFinishTask(uid);
  const { deleteTask } = useDeleteTask(uid);

  const history = useHistory();

  useEffect(() => {
    const tasksCollection = db.collection('users').doc(uid).collection('tasks');

    tasksCollection
      .get()
      .then((querySnapshot) => {
        let getTasks: Task[] = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id.toString();
          const title = doc.get('title') as string;
          const expirationDate = dayjs(doc.get('expirationDate') as string);
          const dueDate = dayjs(doc.get('dueDate') as string);
          const memo = doc.get('memo') as string;
          const hasRepeat = doc.get('hasRepeat') as boolean;

          getTasks = [
            ...getTasks,
            { id, title, expirationDate, dueDate, memo, hasRepeat },
          ];
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

  const handleTaskTitleChange = (title: string) => {
    const task = { ...taskDetail, title };

    setTaskDetail(task);

    firestoreUpdateTitle(task.id, title).catch(() =>
      setErrorMessage('変更に失敗しました。'),
    );

    const newTasks = updateTasks(task);
    setTasks(newTasks);
  };

  const handleTaskDetailExpirationDateChange = (
    expirationDate: dayjs.Dayjs,
  ) => {
    const task = { ...taskDetail, expirationDate };

    setTaskDetail(task);

    firestoreUpdateExpirationDate(task.id, expirationDate).catch(() =>
      setErrorMessage('変更に失敗しました。'),
    );

    const newTasks = updateTasks(task);
    setTasks(newTasks);
  };

  const handleTaskDetailDueDateChange = (dueDate: dayjs.Dayjs) => {
    const task = { ...taskDetail, dueDate };

    setTaskDetail(task);

    firestoreUpdateDueDate(task.id, dueDate).catch(() =>
      setErrorMessage('変更に失敗しました。'),
    );

    const newTasks = updateTasks(task);
    setTasks(newTasks);
  };

  const handleTaskDetailMemoChange = (memo: string) => {
    const task = { ...taskDetail, memo };

    setTaskDetail(task);

    firestoreUpdateMemo(task.id, memo).catch(() =>
      setErrorMessage('変更に失敗しました。'),
    );

    const newTasks = updateTasks(task);
    setTasks(newTasks);
  };

  const handleHasRepeactChange = () => {
    const task = { ...taskDetail, hasRepeat: !taskDetail.hasRepeat };
    setTaskDetail(task);

    firestoreUpdateHasRepeat(task.id, task.hasRepeat).catch(() =>
      setErrorMessage('変更に失敗しました。'),
    );

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

    if (task.hasRepeat) {
      finishRepeatTask(task)
        .then((t) => {
          // eslint-disable-next-line
          console.log(t.expirationDate.format('YYYY-MM-DD'));
          setTasks([...newTasks, t]);
        })
        .catch(() => setErrorMessage('通信エラーが発生しました。'));
    } else {
      finishTask(task)
        .then(() => {
          setTasks(newTasks);
        })
        .catch(() => setErrorMessage('通信エラーが発生しました。'));
    }
  };

  const taskDelete = (task: Task) => {
    const oldTasks = [...tasks];
    const newTasks = oldTasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);

    deleteTask(task).catch(() => {
      setErrorMessage(
        'ToDoの削除に失敗しました。時間をおいて再度実行してください。',
      );
    });
  };

  return (
    <>
      <AppBar
        position="static"
        css={[
          taskDetailOpen ? contentLeftShift : content,
          menuOpen ? contentRightShift : content,
        ]}
      >
        <Toolbar>
          {!menuOpen && (
            <IconButton onClick={handleMenuOpen} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" css={titleStyle}>
            ToDo Storage
          </Typography>
          <Typography variant="body1">{user.displayName}</Typography>
          <Button color="inherit" onClick={handleLogout}>
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
      <main
        css={[
          taskDetailOpen ? contentLeftShift : content,
          container,
          menuOpen ? contentRightShift : content,
        ]}
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
        titleChange={handleTaskTitleChange}
        expirationDateChange={handleTaskDetailExpirationDateChange}
        dueDateChange={handleTaskDetailDueDateChange}
        memoChange={handleTaskDetailMemoChange}
        hasRepeatChange={handleHasRepeactChange}
      />
      <Menu menuOpen={menuOpen} handleMenuClose={handleMenuClose} />
    </>
  );
};

export default Todo;
