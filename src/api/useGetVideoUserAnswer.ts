import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from ".";
import { delay } from "@utils/delay";

interface VideoUserAnswerRes {
  yesResponse1: number;
  noResponse1: number;
  yesResponse2: number;
  noResponse2: number;
  total: number;
  total2: number;
}

interface Params {
  videokey: string;
}

const URL = "/viewanswer-byvideokey";

export const useGetVideoUserAnswer = (params: Params) => {
  return useSuspenseQuery<VideoUserAnswerRes, AxiosError>({
    queryKey: [URL],
    // queryFn: () => api.PUT<VideoUserAnswerRes>(URL, params),
    queryFn: getVideoUserAnswer,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};

const getVideoUserAnswer = async () => {
  await delay(5000);
  return {
    yesResponse1: 1,
    noResponse1: 2,
    yesResponse2: 4,
    noResponse2: 10,
    total: 3,
    total2: 14,
  };
};
