import dayjs from 'dayjs';

import { db } from '../config/Firebase';
import { RepeatType } from '../types/task';

type returnType = {
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
    updateFirestoreTitle,
    updateFirestoreExpirationDate,
    updateFirestoreDueDate,
    updateFirestoreMemo,
    updateFirestoreRepeat,
  };
};

export default useUpdateFirestoreTask;
