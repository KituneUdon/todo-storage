import { db } from '../config/Firebase';
import Task from '../types/task';

type ReturnValueType = {
  finishTask: (task: Task) => Promise<void | 'error'>;
  finishRepeatTask: (task: Task) => Promise<Task>;
};

const useFirestoreFinishTask = (uid: string): ReturnValueType => {
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

      return await db
        .collection('users')
        .doc(uid)
        .collection('tasks')
        .doc(task.id)
        .delete();
    } catch {
      return 'error';
    }
  };

  const finishRepeatTask = async (task: Task) => {
    let newTask = task;

    switch (task.repeat) {
      case 'daily':
        newTask = {
          ...newTask,
          expirationDate: newTask.expirationDate.add(1, 'day'),
          dueDate: newTask.dueDate.add(1, 'day'),
        };
        break;
      case 'monthly':
        newTask = {
          ...newTask,
          expirationDate: newTask.expirationDate.add(1, 'month'),
          dueDate: newTask.dueDate.add(1, 'month'),
        };
        break;
      default:
    }

    let error: Error;

    try {
      await finishTask(task);

      await db
        .collection('users')
        .doc(uid)
        .collection('tasks')
        .add({
          title: newTask.title,
          expirationDate: newTask.expirationDate.format('YYYY-MM-DD'),
          dueDate: newTask.dueDate.format('YYYY-MM-DD'),
          memo: newTask.memo,
          repeat: newTask.repeat,
        });
    } catch {
      error = new Error('Error');
    }

    return new Promise<Task>((resolve, rejects) => {
      resolve(newTask);
      rejects(error);
    });
  };

  return { finishTask, finishRepeatTask };
};

export default useFirestoreFinishTask;