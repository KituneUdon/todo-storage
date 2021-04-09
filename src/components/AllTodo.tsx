import React, { FC } from 'react';

import Task from '../types/task';
import TodoElement from './TodoElement';

type Props = {
  tasks: Task[];
  taskFinish: (task: Task) => void;
  taskDelete: (task: Task) => void;
  openDrawer: (task: Task) => void;
};

const AllTodo: FC<Props> = ({ tasks, taskFinish, taskDelete, openDrawer }) => (
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

export default AllTodo;
