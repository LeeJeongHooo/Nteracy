import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from ".";
import { delay } from "@utils/delay";

interface GptAnswerRes {
  gpt: string;
}

interface Params {
  userId: string;
  videokey: string;
}

const URL = "/view-gptanswer";

export const useGetGptAnswer = (params: Params) => {
  return useSuspenseQuery<GptAnswerRes, AxiosError>({
    queryKey: [URL],
    // queryFn: () =>
    //   api.PUT<GptAnswerRes>(URL, {
    //     params,
    //   }),
    queryFn: getGptAnswer,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};

const getGptAnswer = async () => {
  await delay(8000);
  return {
    gpt: "기사 내용을 살펴보면, 청와대 국민청원과 국회 국민등원 청원에 대한 설명이 사실로 이루어져 있습니다. 또한, 학교 학대 사건과 관련된 교사의 안타까운 결정, 그리고 이로 인해 조건에 대한 주목이 새롭게 받고 있다는 사실도 기사 내용으로 전달됩니다.다만, 많은 사람들이 분노하고 있는지와 사회적으로 중요한 문제로서 적절한 조치와 해결책이 필요하다는 주장은 기자의 의견으로 해석될 수 있습니다. 이 부분은 의견으로 인식해야 합니다.",
  };
};
