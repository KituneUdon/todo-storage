import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDaSy9QewHQkjzOIVYKaLPhu1OYJD8sqVY',
  authDomain: 'todo-strage.firebaseapp.com',
  projectId: 'todo-strage',
  storageBucket: 'todo-strage.appspot.com',
  messagingSenderId: '78223297020',
  appId: '1:78223297020:web:d790b56cdd42121ab40a79',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default firebase;
export { db };
