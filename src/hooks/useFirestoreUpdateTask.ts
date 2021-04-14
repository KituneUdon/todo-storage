import dayjs from 'dayjs';

import { db } from '../config/Firebase';

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
  firestoreUpdateHasRepeat: (
    taskId: string,
    hasRepeat: boolean,
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

  const firestoreUpdateHasRepeat = (taskId: string, hasRepeat: boolean) => {
    const result = db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update({ hasRepeat });

    return result;
  };

  return {
    firestoreUpdateTitle,
    firestoreUpdateExpirationDate,
    firestoreUpdateDueDate,
    firestoreUpdateMemo,
    firestoreUpdateHasRepeat,
  };
};

export default useFirestoreUpdateTask;
