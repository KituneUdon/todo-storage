import React, { FC } from 'react';
import dayjs from 'dayjs';
import Task from '../types/task';

import TaskElement from './TaskElement';

type Props = {
  tasks: Task[];
  finishTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  openDrawer: (task: Task) => void;
};

const TodayTasks: FC<Props> = ({
  tasks,
  finishTask,
  deleteTask,
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
        <TaskElement
          task={task}
          finishTask={finishTask}
          deleteTask={deleteTask}
          key={task.id}
          openTaskDetailDrawer={openDrawer}
        />
      ))}
    </>
  );
};

export default TodayTasks;
