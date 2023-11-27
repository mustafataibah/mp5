import React, { createContext, useContext, useState, ReactNode } from "react";

type UserType = {
  token: string;
  id: string;
  email: string;
  companyName: string;
  companyCategory: string;
  description: string;
} | null;

type UserContextType = {
  user: UserType;
  signIn: (
    token: string,
    id: string,
    email: string,
    companyName: string,
    companyCategory: string,
    description: string
  ) => void;
  signOut: () => void;
  updateUser: (updatedUserData: UserType) => void;
};

const defaultContextValue: UserContextType = {
  user: null,
  signIn: () => {},
  signOut: () => {},
  updateUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const useUser = () => useContext(UserContext);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);

  const signIn = (
    token: string,
    id: string,
    email: string,
    companyName: string,
    companyCategory: string,
    description: string
  ) => {
    localStorage.setItem("token", token);
    setUser({ token, id, email, companyName, companyCategory, description });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUser = (updatedUserData: UserType) => {
    setUser(updatedUserData);
  };

  return <UserContext.Provider value={{ user, signIn, signOut, updateUser }}>{children}</UserContext.Provider>;
};
