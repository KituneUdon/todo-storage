import { db } from '../config/Firebase';
import Task from '../types/task';

type ReturnValueType = {
  deleteTask: (task: Task) => Promise<void>;
};

const useDeleteFirestoreTask = (uid: string): ReturnValueType => {
  const deleteTask = (task: Task) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(task.id)
      .delete();

    return result;
  };

  return { deleteTask };
};

export default useDeleteFirestoreTask;
