import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Tabs } from "../common/tabs";
import { Skeleton } from "../common/skeleton";
import { Card } from "../card";
import { YoutubeInfoContainer } from "./components/YoutubeInfoContainer";
import { GptAnswerContainer } from "./components/GptAnswerContainer";
import { NewsEvaluationForm } from "./components/NewsEvaluationForm";
import { GlobalErrorFallback } from "../error/GlobalErrorFallback";
import { GptAnswerLoading } from "./components/GptAnswerLoading";
import { NewsResponseList } from "./components/NewsResponseList";
import { AuthFallback, ProtectedAuth } from "./auth/ProtectedAuth";

export const Content = () => {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      <Tabs defaultValue="information">
        <Tabs.List className="flex mt-2 mx-4">
          <Tabs.Trigger value="information">정보</Tabs.Trigger>
          <Tabs.Trigger value="history">기록</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="information">
          <Suspense
            fallback={Array.from({ length: 3 }, (_, idx) => (
              <Skeleton key={idx} className="h-52" />
            ))}
          >
            <YoutubeInfoContainer />
            <ProtectedAuth FallbackComponent={AuthFallback}>
              <Suspense fallback={<GptAnswerLoading />}>
                <GptAnswerContainer />
              </Suspense>
            </ProtectedAuth>
            <Card title="사용자 평가">
              <NewsEvaluationForm />
            </Card>
          </Suspense>
        </Tabs.Content>
        <Tabs.Content value="history">
          <ProtectedAuth FallbackComponent={AuthFallback}>
            <Suspense
              fallback={Array.from({ length: 4 }, (_, idx) => (
                <Skeleton key={idx} className="h-36" />
              ))}
            >
              <NewsResponseList />
            </Suspense>
          </ProtectedAuth>
        </Tabs.Content>
      </Tabs>
    </ErrorBoundary>
  );
};
