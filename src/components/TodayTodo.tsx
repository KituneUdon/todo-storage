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

  return (
    <>
      {tasks.map((task) => {
        if (
          task.expirationDate.isSame(today, 'year') &&
          task.expirationDate.isSame(today, 'month') &&
          task.expirationDate.isSame(today, 'day')
        ) {
          return (
            <TodoElement
              task={task}
              taskFinish={taskFinish}
              taskDelete={taskDelete}
              openDrawer={openDrawer}
            />
          );
        }

        return 0;
      })}
    </>
  );
};

export default TodayTodo;
