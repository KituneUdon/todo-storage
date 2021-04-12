import React, { FC, useState } from 'react';
import { css } from '@emotion/css';
import { TextField, IconButton, Card } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import dayjs from 'dayjs';

import firebase, { db } from '../config/Firebase';

import Task from '../types/task';

type Props = {
  setErrorMessage: (errorMessage: string) => void;
  setTasks: (task: Task[]) => void;
  tasks: Task[];
};

const container = css`
  display: flex;
  align-items: center;
`;

const input = css`
  flex-grow: 1;
`;

const AddTodo: FC<Props> = ({ setErrorMessage, setTasks, tasks }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const uid = firebase.auth().currentUser?.uid;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleAddTask = () => {
    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .add({
        taskTitle,
        expirationDate: dayjs().format('YYYY-MM-DD'),
        dueDate: dayjs().format('YYYY-MM-DD'),
      })
      .then((e) => {
        setTaskTitle('');
        setTasks([
          ...tasks,
          {
            id: e.id.toString(),
            title: taskTitle,
            expirationDate: dayjs(),
            dueDate: dayjs(),
            memo: '',
          },
        ]);
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
    <Card className={container}>
      <IconButton onClick={handleAddTask}>
        <AddIcon />
      </IconButton>
      <TextField
        className={input}
        label="タスクを追加する"
        onChange={handleChange}
        value={taskTitle}
        onKeyDown={handleKeyPress}
      />
    </Card>
  );
};

export default AddTodo;
