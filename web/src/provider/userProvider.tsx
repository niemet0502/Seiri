import { createContext, useCallback, useEffect, useState } from "react";
import { history } from "../App";
import { Loader } from "../components/Loader";
import { AuthRouting } from "../pages/Auth/AuthRouting";
import { User } from "../types";

interface CurrentContextValue {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  logout: () => void;
}

export const TOKEN_LS_KEY = "userToken";
export const USER_LS_KEY = "userInfo";

export const CurrentUserContext = createContext<CurrentContextValue>(
  {} as CurrentContextValue
);

export const CurrentUserProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const token = localStorage.getItem(TOKEN_LS_KEY);

      if (token) {
        const user = JSON.parse(localStorage.getItem(USER_LS_KEY) as string);

        setCurrentUser(user);
      }
    } catch (e) {
      console.log(e);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(USER_LS_KEY, JSON.stringify(currentUser));
  }, [currentUser]);

  const logout = useCallback(() => {
    // query to the backend to destroy the token

    localStorage.clear();
    setCurrentUser(null);

    history.push("/");
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, logout }}
    >
      {currentUser === null ? loading ? <Loader /> : <AuthRouting /> : children}
      {/* {currentUser === null ? loading ? <Loader logo={true} /> : <BaseLandingPage /> : children} */}
    </CurrentUserContext.Provider>
  );
};
