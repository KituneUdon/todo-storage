import React, { FC, useState, useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TextField, IconButton, Card } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import dayjs from 'dayjs';

import useFirestoreAddTask from '../hooks/useFirestoreAddTask';
import { AuthContext } from '../contexts/Auth';

import Task from '../types/task';

type Props = {
  setErrorMessage: (errorMessage: string) => void;
  setTasks: (task: Task[]) => void;
  tasks: Task[];
};

const container = css({
  display: 'flex',
  alignItems: 'center',
});

const input = css({
  flexGrow: 1,
});

const AddTask: FC<Props> = ({ setErrorMessage, setTasks, tasks }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const { user } = useContext(AuthContext);

  const { uid } = user;
  const { firestoreAddTask } = useFirestoreAddTask(uid);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleAddTask = () => {
    const task: Task = {
      id: '',
      title: taskTitle,
      expirationDate: dayjs(),
      dueDate: dayjs(),
      memo: '',
      repeat: 'none',
    };

    firestoreAddTask(task)
      .then((e) => {
        setTaskTitle('');
        setTasks([...tasks, { ...task, id: e.id.toString() }]);
      })
      .catch(() => {
        setErrorMessage(
          'タスクの追加に失敗しました。時間をおいて再度実行してください',
        );
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <Card css={container}>
      <IconButton onClick={handleAddTask}>
        <AddIcon />
      </IconButton>
      <TextField
        css={input}
        label="タスクを追加する"
        onChange={handleChange}
        value={taskTitle}
        onKeyDown={handleKeyPress}
      />
    </Card>
  );
};

export default AddTask;
