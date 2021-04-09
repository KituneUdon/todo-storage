import React, { FC } from 'react';
import dayjs from 'dayjs';
import Task from '../types/task';

import TodoElement from './TodoElement';

type Props = {
  tasks: Task[];
  taskFinish: (task: Task) => void;
  taskDelete: (task: Task) => void;
  openDrawer: (task: Task) => void;
};

const TodayTodo: FC<Props> = ({
  tasks,
  taskFinish,
  taskDelete,
  openDrawer,
}) => {
  const today = dayjs();

  const todayTasks = tasks.filter(
    (task) =>
      task.expirationDate.isSame(today, 'year') &&
      task.expirationDate.isSame(today, 'month') &&
      task.expirationDate.isSame(today, 'day'),
  );

  return (
    <>
      {todayTasks.map((task) => (
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

export default TodayTodo;
