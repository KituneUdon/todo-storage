import { db } from '../config/Firebase';
import Task from '../types/task';

type ReturnValueType = {
  finishTask: (task: Task) => Promise<void | 'error'>;
  finishRepeatTask: (task: Task) => Promise<Task>;
};

const useFinishTask = (uid: string): ReturnValueType => {
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
    const newTask: Task = {
      ...task,
      expirationDate: task.expirationDate.add(1, 'day'),
      dueDate: task.dueDate.add(1, 'day'),
    };
    let error: Error;

    // eslint-disable-next-line
    console.log(newTask.expirationDate.format('YYYY-MM-DD'));

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
          hasRepeat: newTask.hasRepeat,
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

export default useFinishTask;
