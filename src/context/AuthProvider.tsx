import React, { createContext, useState } from "react";

interface authObject {
  itsAuth: boolean;
  accessToken?: string;
  person_uid?: string;
}

interface isSignedIn {
  auth: authObject;
  toogleSetAuth: (newAuth: authObject) => void;
}

const defaultState = {
  auth: { itsAuth: false },
  toogleSetAuth: () => null,
};

export const AuthContext = createContext<isSignedIn>(defaultState);

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(defaultState.auth);

  const toogleSetAuth = (newAuth: authObject) => {
    setAuth(newAuth);
  };

  return (
    <AuthContext.Provider value={{ auth, toogleSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// To consume this:   const { toogleSetAuth } = useContext(AuthContext);
