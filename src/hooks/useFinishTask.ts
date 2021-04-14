import { db } from '../config/Firebase';
import Task from '../types/task';

const useFinishTask = (
  uid: string,
): { finishTask: (task: Task) => Promise<void | 'error'> } => {
  const finishTask = async (task: Task) => {
    try {
      if (task.memo) {
        await db
          .collection('users')
          .doc(uid)
          .collection('finishTasks')
          .doc(task.id)
          .set({
            title: task.title,
            expirationDate: task.expirationDate.format('YYYY-MM-DD'),
            dueDate: task.dueDate.format('YYYY-MM-DD'),
            memo: task.memo,
          });
      } else {
        await db
          .collection('users')
          .doc(uid)
          .collection('finishTasks')
          .doc(task.id)
          .set({
            title: task.title,
            expirationDate: task.expirationDate.format('YYYY-MM-DD'),
            dueDate: task.dueDate.format('YYYY-MM-DD'),
          });
      }

      return db
        .collection('users')
        .doc(uid)
        .collection('tasks')
        .doc(task.id)
        .delete();
    } catch {
      return 'error';
    }
  };

  return { finishTask };
};

export default useFinishTask;
