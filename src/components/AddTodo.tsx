import React, { FC, useState } from 'react';
import { css } from '@emotion/css';
import { TextField, IconButton, Card } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
  const [task, setTask] = useState('');

  const uid = firebase.auth().currentUser?.uid;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    db.collection('tasks')
      .doc(uid)
      .collection('todo')
      .add({
        task,
      })
      .then((e) => {
        setTask('');
        setTasks([
          ...tasks,
          {
            id: e.id.toString(),
            task,
            expirationDate: '',
            dueDate: '',
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
        value={task}
        onKeyDown={handleKeyPress}
      />
    </Card>
  );
};

export default AddTodo;
