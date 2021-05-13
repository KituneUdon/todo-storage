import React, { FC } from 'react';

import Task from '../types/task';
import TaskElement from './TaskElement';

type Props = {
  tasks: Task[];
  finishTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  openTaskDetailDrawer: (task: Task) => void;
};

const AllTasks: FC<Props> = ({
  tasks,
  finishTask,
  deleteTask,
  openTaskDetailDrawer: openDrawer,
}) => (
  <>
    {tasks.map((task) => (
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

export default AllTasks;
