import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from ".";

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

export const useGetVideoUserAnswer = (params: Params) => {
  return useSuspenseQuery({
    queryKey: [URL],
    queryFn: () =>
      api.PUT<VideoUserAnswerRes>("/viewanswer-byvideokey", params),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    select: (res) => res.data,
  });
};
