import React, { FC } from 'react';

import ToDoElement from './ToDoElement';

import firebase from '../config/Firebase';

type Task = {
  id: string;
  task: string;
};

type Props = {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
  setErrorMessage: (errorMessage: string) => void;
};

const db = firebase.firestore();

const ToDoList: FC<Props> = ({ tasks, setTasks, setErrorMessage }) => {
  const taskFinish = (task: Task) => {
    const oldTasks = [...tasks];
    const newTasks = oldTasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);

    const uid = firebase.auth().currentUser?.uid;
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

  return (
    <>
      {tasks.map((task) => (
        <ToDoElement task={task} taskFinish={taskFinish} key={task.id} />
      ))}
    </>
  );
};

export default ToDoList;
