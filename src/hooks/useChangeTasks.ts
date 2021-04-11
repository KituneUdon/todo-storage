import Task from '../types/task';

type ReturnValue = {
  changeTask: (newTask: Task) => Task[];
};

const useChangeTasks = (tasks: Task[]): ReturnValue => {
  const changeTask = (newTask: Task): Task[] => {
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

  return { changeTask };
};

export default useChangeTasks;
