import firebase from 'firebase';

import { db } from '../config/Firebase';
import Task from '../types/task';

type ReturnValue = {
  addFirestoreTask: (
    task: Task,
  ) => Promise<
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  >;
};

const useAddFirestoreTask = (uid: string): ReturnValue => {
  const addFirestoreTask = (
    task: Task,
  ): Promise<
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  > =>
    db
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .add({
        title: task.title,
        expirationDate: task.expirationDate.format('YYYY-MM-DD'),
        dueDate: task.dueDate.format('YYYY-MM-DD'),
        memo: task.memo,
        repeat: task.repeat,
      });

  return { addFirestoreTask };
};

export default useAddFirestoreTask;
