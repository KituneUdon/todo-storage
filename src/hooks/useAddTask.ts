import firebase from 'firebase';

import { db } from '../config/Firebase';
import Task from '../types/task';

type ReturnValue = {
  firestoreAddTask: (
    task: Task,
  ) => Promise<
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  >;
};

const useFirestoreAddTask = (uid: string): ReturnValue => {
  const firestoreAddTask = (
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

  return { firestoreAddTask };
};

export default useFirestoreAddTask;
