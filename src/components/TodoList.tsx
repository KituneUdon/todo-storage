import React, { FC, useContext } from 'react';

import TodoElement from './TodoElement';

import { db } from '../config/Firebase';
import { AuthContext } from '../contexts/Auth';

import Task from '../types/task';

type Props = {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
  setErrorMessage: (errorMessage: string) => void;
  openDrawer: (task: Task) => void;
};

const ToDoList: FC<Props> = ({
  tasks,
  setTasks,
  setErrorMessage,
  openDrawer,
}) => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

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
      {tasks.map((task) => (
        <TodoElement
          task={task}
          taskFinish={taskFinish}
          taskDelete={taskDelete}
          key={task.id}
          openDrawer={openDrawer}
        />
      ))}
    </>
  );
};

export default ToDoList;
