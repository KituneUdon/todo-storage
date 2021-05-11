import Task from '../types/task';

type ReturnValue = {
  generateNewTasks: (newTask: Task) => Task[];
};

const useGenerateNewTasks = (tasks: Task[]): ReturnValue => {
  const generateNewTasks = (newTask: Task): Task[] => {
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

  return { generateNewTasks };
};

export default useGenerateNewTasks;
