import { ComponentType, Fragment, ReactNode } from "react";
import { useAuthContext } from "./context";
import { Card } from "@content/components/card";

interface ProtectedAuthProps {
  FallbackComponent: ComponentType;
  children: ReactNode;
}

export const ProtectedAuth = (props: ProtectedAuthProps) => {
  const { FallbackComponent, children } = props;
  const { email } = useAuthContext();

  if (email === null) return null;

  if (!email) return <FallbackComponent />;

  return <Fragment>{children}</Fragment>;
};

export const AuthFallback = () => {
  return <Card title="로그인을 해주세요!" />;
};
