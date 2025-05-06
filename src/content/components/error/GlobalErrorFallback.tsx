import { FallbackProps } from "react-error-boundary";
import { Card } from "../card";
import { Text } from "../common/txt/Text";

type GLOBAL_ERROR = "NETWORK_ERROR" | "SERVER_ERROR" | "UNKNOWN_ERROR";

const errorMessages: Record<GLOBAL_ERROR, string> = {
  NETWORK_ERROR: "🌀 인터넷이 연결되어 있지 않습니다.",
  SERVER_ERROR: "⚠️ 서버에 문제가 발생습니다.",
  UNKNOWN_ERROR: "❓ 알 수 없는 오류가 발생했습니다",
};

export const GlobalErrorFallback = ({ error }: FallbackProps) => {
  if (!navigator.onLine) {
    return <Card title={errorMessages["NETWORK_ERROR"]} />;
  }
  if (error.code === "ERR_NETWORK") {
    return (
      <Card title={errorMessages["SERVER_ERROR"]}>
        <Text as="p" className="text-sm font-medium">
          잠시 후 다시 실행해주세요.
        </Text>
      </Card>
    );
  }

  return <Card title={errorMessages["SERVER_ERROR"]} />;
};
