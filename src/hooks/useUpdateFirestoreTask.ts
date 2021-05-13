import dayjs from 'dayjs';

import { db } from '../config/Firebase';
import Task, { RepeatType } from '../types/task';

type returnType = {
  updataFirestoreTask: (task: Task) => Promise<void>;
  updateFirestoreTitle: (taskId: string, title: string) => Promise<void>;
  updateFirestoreExpirationDate: (
    taskId: string,
    dueDate: dayjs.Dayjs,
  ) => Promise<void>;
  updateFirestoreDueDate: (
    taskId: string,
    dueDate: dayjs.Dayjs,
  ) => Promise<void>;
  updateFirestoreMemo: (taskId: string, memo: string) => Promise<void>;
  updateFirestoreRepeat: (
    taskId: string,
    hasRepeat: RepeatType,
  ) => Promise<void>;
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

  const updateFirestoreTitle = (taskId: string, title: string) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({ title });

    return result;
  };

  const updateFirestoreExpirationDate = (
    taskId: string,
    expirationDate: dayjs.Dayjs,
  ) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({ expirationDate: expirationDate.format('YYYY-MM-DD') });

    return result;
  };

  const updateFirestoreDueDate = (taskId: string, dueDate: dayjs.Dayjs) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({ dueDate: dueDate.format('YYYY-MM-DD') });

    return result;
  };

  const updateFirestoreMemo = (taskId: string, memo: string) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({ memo });

    return result;
  };

  const updateFirestoreRepeat = (taskId: string, repeat: RepeatType) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({ repeat });

    return result;
  };

  return {
    updataFirestoreTask,
    updateFirestoreTitle,
    updateFirestoreExpirationDate,
    updateFirestoreDueDate,
    updateFirestoreMemo,
    updateFirestoreRepeat,
  };
};

export default useUpdateFirestoreTask;
