import React, { FC, createContext, useState, useEffect } from 'react';

import firebase from '../config/Firebase';

type User = {
  uid: string;
  displayName: string;
};

type ContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const AuthContext = createContext({} as ContextType);

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>({ uid: '', displayName: '' });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        setUser({
          uid: u.uid,
          displayName: u.displayName ?? '名無し',
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
