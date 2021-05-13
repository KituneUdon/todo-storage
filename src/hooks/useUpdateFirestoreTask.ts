import { db } from '../config/Firebase';
import Task from '../types/task';

type returnType = {
  updataFirestoreTask: (task: Task) => Promise<void>;
};

const useUpdateFirestoreTask = (uid: string): returnType => {
  const updataFirestoreTask = (task: Task) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(task.id)
      .update({
        title: task.title,
        expirationDate: task.expirationDate.format('YYYY-MM-DD'),
        dueDate: task.dueDate.format('YYYY-MM-DD'),
        memo: task.memo,
        repeat: task.repeat,
      });

    return result;
  };

  return {
    updataFirestoreTask,
  };
};

export default useUpdateFirestoreTask;
