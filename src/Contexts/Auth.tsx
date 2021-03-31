import React, { FC, createContext, useState, useEffect } from 'react';

import firebase from '../config/Firebase';

type User = {
  displayName: string;
};

type ContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const AuthContext = createContext({} as ContextType);

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>({ displayName: '' });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        setUser({ displayName: u.displayName as string });
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
