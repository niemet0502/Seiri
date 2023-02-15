import { createContext, useState } from "react";
import { AuthRouting } from "../pages/Auth/AuthRouting";
import { User } from "../types";

interface CurrentContextValue {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
}

export const CurrentUserContext = createContext<CurrentContextValue>(
  {} as CurrentContextValue
);

export const CurrentUserProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentUser === null ? <AuthRouting /> : children}
    </CurrentUserContext.Provider>
  );
};
