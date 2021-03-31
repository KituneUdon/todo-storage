import React, { FC } from 'react';

import ToDoElement from './ToDoElement';

type Tasks = {
  id: string;
  task: string;
};

type Props = {
  tasks: Tasks[];
};

const ToDoList: FC<Props> = ({ tasks }) => (
  <>
    {tasks.map((task) => (
      <ToDoElement task={task.task} key={task.id} />
    ))}
  </>
);
export default ToDoList;
