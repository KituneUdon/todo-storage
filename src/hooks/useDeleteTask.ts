import { db } from '../config/Firebase';
import Task from '../types/task';

type ReturnValueType = {
  deleteTask: (task: Task) => Promise<void>;
};

const useDeleteTask = (uid: string): ReturnValueType => {
  const deleteTask = (task: Task) => {
    const result = db
      .collection('tasks')
      .doc(uid)
      .collection('todo')
      .doc(task.id)
      .delete();

    return result;
  };

  return { deleteTask };
};

export default useDeleteTask;
