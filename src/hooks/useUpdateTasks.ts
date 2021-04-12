import Task from '../types/task';

type ReturnValue = {
  updateTasks: (newTask: Task) => Task[];
};

const useUpdateTasks = (tasks: Task[]): ReturnValue => {
  const updateTasks = (newTask: Task): Task[] => {
    const oldTasks = tasks;
    const newTasks = oldTasks.map((t) => {
      let task = t;
      if (task.id === newTask.id) {
        task = newTask;
      }

      return task;
    });

    return newTasks;
  };

  return { updateTasks };
};

export default useUpdateTasks;
