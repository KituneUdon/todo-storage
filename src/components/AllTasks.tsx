import React, { FC } from 'react';

import Task from '../types/task';
import TaskElement from './TaskElement';

type Props = {
  tasks: Task[];
  taskFinish: (task: Task) => void;
  taskDelete: (task: Task) => void;
  openDrawer: (task: Task) => void;
};

const AllTasks: FC<Props> = ({ tasks, taskFinish, taskDelete, openDrawer }) => (
  <>
    {tasks.map((task) => (
      <TaskElement
        task={task}
        taskFinish={taskFinish}
        taskDelete={taskDelete}
        key={task.id}
        openDrawer={openDrawer}
      />
    ))}
  </>
);

export default AllTasks;
