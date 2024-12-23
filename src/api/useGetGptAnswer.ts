import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from ".";

interface GptAnswerRes {
  gpt: string;
}

interface Params {
  userId: string;
  videokey: string;
}

const URL = "/view-gptanswer";

export const useGetGptAnswer = (params: Params) => {
  return useQuery<AxiosResponse<GptAnswerRes>, AxiosError>({
    queryKey: [URL],
    queryFn: () =>
      api.PUT<GptAnswerRes>(URL, {
        params,
      }),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};
