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
import { Switch, Redirect, useLocation, useHistory } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';

import dayjs from 'dayjs';
import { AuthContext } from '../contexts/Auth';
import AddTask from './AddTask';
import firebase, { db } from '../config/Firebase';
import Task, { RepeatType } from '../types/task';
import TaskDetail from './TaskDetail';
import Menu from './Menu';
import AllTasks from './AllTasks';
import TodayTasks from './TodayTasks';
import PrivateRoute from '../router/PrivateRoute';
import useGenerateNewTasks from '../hooks/useGenerateNewTasks';
import useUpdateFirestoreTask from '../hooks/useUpdateFirestoreTask';
import useFinishFirestoreTask from '../hooks/useFinishFirestoreTask';
import useDeleteFirestoreTask from '../hooks/useDeleteFirestoreTask';

const taskDetailWidth = 360;
const menuWidth = 200;

const container = css({
  margin: '10px',
  marginLeft: '82px',
  marginTop: '74px',
});

const titleStyle = css({
  flexGrow: 1,
});

const appbar = css({
  zIndex: 1201,
});

const content = css({});

const appbarLeftShift = css({
  width: `calc(100% - ${taskDetailWidth}px)`,
  marginRight: `${taskDetailWidth}px`,
});

const contentRightShift = css({
  width: `calc(100% - ${menuWidth}px)`,
  marginLeft: `${menuWidth}px`,
});

const contentLeftShift = css({
  width: `calc(100% - ${taskDetailWidth + 72}px)`,
  marginRight: `${taskDetailWidth}px`,
});

const defaultTask: Task = {
  id: '',
  title: '',
  expirationDate: dayjs(),
  dueDate: dayjs(),
  memo: '',
  repeat: 'none',
};

const titleMap = new Map([
  ['/tasks/all', 'すべてのタスク'],
  ['/tasks/today', '今日のタスク'],
]);

const Tasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [hasOpenedMenu, setHasOpenedMenu] = useState(false);
  const { generateNewTasks } = useGenerateNewTasks(tasks);
  const [currentUrl, setCurrentUrl] = useState('/tasks/all');
  const { user, setUser } = useContext(AuthContext);
  const { uid } = user;
  const [taskDetailId, setTaskDetailId] = useState('');

  const {
    updateFirestoreTitle: firestoreUpdateTitle,
    updateFirestoreExpirationDate: firestoreUpdateExpirationDate,
    updateFirestoreDueDate: firestoreUpdateDueDate,
    updateFirestoreMemo: firestoreUpdateMemo,
    updateFirestoreRepeat: firestoreUpdateRepeat,
  } = useUpdateFirestoreTask(uid);
  const {
    finishFirestoreTask,
    finishFirestoreRepeatTask,
  } = useFinishFirestoreTask(uid);
  const { deleteFirestoreTask } = useDeleteFirestoreTask(uid);

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
          const repeat = doc.get('repeat') as RepeatType;

          getTasks = [
            ...getTasks,
            { id, title, expirationDate, dueDate, memo, repeat },
          ];
        });
        setTasks(getTasks);
        getTasks = [];
      })
      .catch(() => {
        setErrorMessage('タスクの取得に失敗しました。');
      });
  }, [uid]);

  const location = useLocation();

  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);

  const openTaskDetailDrawer = (task: Task) => {
    setTaskDetailId(task.id);
    setTaskDetailOpen(true);
  };

  const closeTaskDetailDrawer = () => {
    setTaskDetailId('');
    setTaskDetailOpen(false);
  };

  const openMenu = () => {
    setHasOpenedMenu(true);
  };

  const closeMenu = () => {
    setHasOpenedMenu(false);
  };

  const changeTasks = (task: Task) => {
    const newTasks = generateNewTasks(task);
    setTasks(newTasks);
  };

  const updateFirestoreTaskTitle = (taskid: string) => {
    const updateTargetTask = tasks.find((t) => t.id === taskid);

    if (updateTargetTask) {
      firestoreUpdateTitle(
        updateTargetTask.id,
        updateTargetTask.title,
      ).catch(() => setErrorMessage('変更に失敗しました。'));
    } else {
      setErrorMessage('変更に失敗しました。');
    }
  };

  const updateFirestoreTaskExpirationDate = (taskid: string) => {
    const updateTargetTask = tasks.find((t) => t.id === taskid);

    if (updateTargetTask) {
      firestoreUpdateExpirationDate(
        updateTargetTask.id,
        updateTargetTask.expirationDate,
      ).catch(() => setErrorMessage('変更に失敗しました。'));
    } else {
      setErrorMessage('変更に失敗しました。');
    }
  };

  const updateFirestoreTaskDueDate = (taskid: string) => {
    const updateTargetTask = tasks.find((t) => t.id === taskid);

    if (updateTargetTask) {
      firestoreUpdateDueDate(
        updateTargetTask.id,
        updateTargetTask.dueDate,
      ).catch(() => setErrorMessage('変更に失敗しました。'));
    } else {
      setErrorMessage('変更に失敗しました。');
    }
  };

  const updateFirestoreTaskMemo = (taskid: string) => {
    const updateTargetTask = tasks.find((t) => t.id === taskid);

    if (updateTargetTask) {
      firestoreUpdateMemo(
        updateTargetTask.id,
        updateTargetTask.memo,
      ).catch(() => setErrorMessage('変更に失敗しました。'));
    } else {
      setErrorMessage('変更に失敗しました。');
    }
  };

  const updateFirestoreTaskRepeat = (taskid: string) => {
    const updateTargetTask = tasks.find((t) => t.id === taskid);

    if (updateTargetTask) {
      firestoreUpdateRepeat(
        updateTargetTask.id,
        updateTargetTask.repeat,
      ).catch(() => setErrorMessage('変更に失敗しました。'));
    } else {
      setErrorMessage('変更に失敗しました。');
    }
  };

  const logout = () => {
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

  const finishTask = (task: Task) => {
    const oldTasks = [...tasks];
    const newTasks = oldTasks.filter((t) => t.id !== task.id);

    setTaskDetailOpen(false);

    if (task.repeat === 'none') {
      finishFirestoreTask(task)
        .then(() => {
          setTasks(newTasks);
        })
        .catch(() => setErrorMessage('通信エラーが発生しました。'));
    } else {
      finishFirestoreRepeatTask(task)
        .then((t) => {
          setTasks([...newTasks, t]);
        })
        .catch(() => setErrorMessage('通信エラーが発生しました。'));
    }
  };

  const deleteTask = (task: Task) => {
    const oldTasks = [...tasks];
    const newTasks = oldTasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);

    setTaskDetailOpen(false);

    deleteFirestoreTask(task).catch(() => {
      setErrorMessage(
        'ToDoの削除に失敗しました。時間をおいて再度実行してください。',
      );
    });
  };

  const getTaskDetail = () => {
    const taskDetail = tasks.find((t) => t.id === taskDetailId) ?? defaultTask;

    return taskDetail;
  };

  return (
    <>
      <AppBar
        position="fixed"
        css={[
          taskDetailOpen ? appbarLeftShift : content,
          hasOpenedMenu ? contentRightShift : content,
          appbar,
        ]}
      >
        <Toolbar>
          {!hasOpenedMenu && (
            <IconButton onClick={openMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" css={titleStyle}>
            ToDo Storage
          </Typography>
          <Typography variant="body1">{user.displayName}</Typography>
          <Button color="inherit" onClick={logout}>
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
      <main
        css={[
          container,
          taskDetailOpen ? contentLeftShift : content,
          hasOpenedMenu ? contentRightShift : content,
        ]}
      >
        <Typography variant="h6">{titleMap.get(currentUrl)}</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <AddTask
          setErrorMessage={setErrorMessage}
          setTasks={setTasks}
          tasks={tasks}
        />
        <Switch>
          <PrivateRoute path="/tasks/all">
            <AllTasks
              tasks={tasks}
              taskFinish={finishTask}
              taskDelete={deleteTask}
              openDrawer={openTaskDetailDrawer}
            />
          </PrivateRoute>
          <PrivateRoute path="/tasks/today">
            <TodayTasks
              tasks={tasks}
              taskFinish={finishTask}
              taskDelete={deleteTask}
              openDrawer={openTaskDetailDrawer}
            />
          </PrivateRoute>
          <PrivateRoute path="/tasks">
            <Redirect to="/tasks/all" />
          </PrivateRoute>
        </Switch>
      </main>
      <TaskDetail
        oepn={taskDetailOpen}
        task={getTaskDetail()}
        changeTasks={changeTasks}
        drawerClose={closeTaskDetailDrawer}
        updateFirestoreTaskTitle={updateFirestoreTaskTitle}
        updateFirestoreTaskExpirationDate={updateFirestoreTaskExpirationDate}
        updateFirestoreTaskDueDate={updateFirestoreTaskDueDate}
        updateFirestoreTaskMemo={updateFirestoreTaskMemo}
        updateFirestoreTaskRepeat={updateFirestoreTaskRepeat}
      />
      <Menu hasOpenedMenu={hasOpenedMenu} closeMenu={closeMenu} />
    </>
  );
};

export default Tasks;
