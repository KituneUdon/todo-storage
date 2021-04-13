import { db } from '../config/Firebase';
import Task from '../types/task';

const useFinishTask = (
  uid: string,
): { finishTask: (task: Task) => Promise<void | 'error'> } => {
  const finishTask = async (task: Task) => {
    try {
      if (task.memo) {
        await db
          .collection('tasks')
          .doc(uid)
          .collection('finishTask')
          .doc(task.id)
          .set({
            title: task.title,
            expirationDate: task.expirationDate.format('YYYY-MM-DD'),
            dueDate: task.dueDate.format('YYYY-MM-DD'),
            memo: task.memo,
          });
      } else {
        await db
          .collection('tasks')
          .doc(uid)
          .collection('finishTask')
          .doc(task.id)
          .set({
            title: task.title,
            expirationDate: task.expirationDate.format('YYYY-MM-DD'),
            dueDate: task.dueDate.format('YYYY-MM-DD'),
          });
      }

      return db
        .collection('tasks')
        .doc(uid)
        .collection('task')
        .doc(task.id)
        .delete();
    } catch {
      return 'error';
    }
  };

  return { finishTask };
};

export default useFinishTask;
