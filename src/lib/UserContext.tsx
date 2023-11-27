import React, { createContext, useContext, useState, ReactNode } from "react";

type UserType = {
  token: string;
} | null;

type UserContextType = {
  user: UserType;
  signIn: (token: string) => void;
  signOut: () => void;
};

const defaultContextValue: UserContextType = {
  user: null,
  signIn: () => {},
  signOut: () => {},
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const useUser = () => useContext(UserContext);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);

  const signIn = (token: string) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return <UserContext.Provider value={{ user, signIn, signOut }}>{children}</UserContext.Provider>;
};
