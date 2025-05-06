import { createContext, useContext } from "react";

export interface AuthContextValues {
  email: string;
  id: string;
}

export const AuthContext = createContext<AuthContextValues | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext는 AuthContextProvider 내부에서만 사용 가능합니다."
    );
  }

  return context;
};
