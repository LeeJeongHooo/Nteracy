import { Card } from "@content/components/card";
import { useEffect, useState } from "react";

const TIME = 60 * 1000;

const LOADING_TEXT = [
  "GPT가 사실/의견 요약 정보를 분석중입니다...",
  "GPT에 트래픽이 몰려 대기 시간이 길어집니다... 잠시만 기달려주세요...",
];

export const GptAnswerLoading = () => {
  const [loadingText, setLoadingText] = useState(LOADING_TEXT[0]);

  useEffect(() => {
    const _id = setTimeout(() => {
      setLoadingText(() => LOADING_TEXT[1]);
    }, TIME);

    return () => clearTimeout(_id);
  }, []);

  return <Card title={loadingText} />;
};
