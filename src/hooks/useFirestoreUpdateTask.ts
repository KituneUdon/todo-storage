import dayjs from 'dayjs';

import { db } from '../config/Firebase';
import { RepeatType } from '../types/task';

type returnType = {
  firestoreUpdateTitle: (taskId: string, title: string) => Promise<void>;
  firestoreUpdateExpirationDate: (
    taskId: string,
    dueDate: dayjs.Dayjs,
  ) => Promise<void>;
  firestoreUpdateDueDate: (
    taskId: string,
    dueDate: dayjs.Dayjs,
  ) => Promise<void>;
  firestoreUpdateMemo: (taskId: string, memo: string) => Promise<void>;
  firestoreUpdateRepeat: (
    taskId: string,
    hasRepeat: RepeatType,
  ) => Promise<void>;
};

const useFirestoreUpdateTask = (uid: string): returnType => {
  const firestoreUpdateTitle = (taskId: string, title: string) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({ title });

    return result;
  };

  const firestoreUpdateExpirationDate = (
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

  const firestoreUpdateDueDate = (taskId: string, dueDate: dayjs.Dayjs) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({ dueDate: dueDate.format('YYYY-MM-DD') });

    return result;
  };

  const firestoreUpdateMemo = (taskId: string, memo: string) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({ memo });

    return result;
  };

  const firestoreUpdateRepeat = (taskId: string, repeat: RepeatType) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({ repeat });

    return result;
  };

  return {
    firestoreUpdateTitle,
    firestoreUpdateExpirationDate,
    firestoreUpdateDueDate,
    firestoreUpdateMemo,
    firestoreUpdateRepeat,
  };
};

export default useFirestoreUpdateTask;
