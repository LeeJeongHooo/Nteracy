import { ReactNode, useEffect, useState } from "react";
import { AuthContext, AuthContextValues } from "./context";
import { BackgroundRequest } from "@background/const";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [userInfo, setUserInfo] = useState<AuthContextValues>({
    email: "",
    id: "",
  });

  useEffect(() => {
    chrome.runtime.sendMessage(BackgroundRequest.OAUTH, (response) =>
      setUserInfo(response)
    );
  }, []);

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};
