import { db } from '../config/Firebase';
import Task from '../types/task';

type ReturnValueType = {
  deleteFirestoreTask: (task: Task) => Promise<void>;
};

const useDeleteFirestoreTask = (uid: string): ReturnValueType => {
  const deleteFirestoreTask = (task: Task) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(task.id)
      .delete();

    return result;
  };

  return { deleteFirestoreTask };
};

export default useDeleteFirestoreTask;
