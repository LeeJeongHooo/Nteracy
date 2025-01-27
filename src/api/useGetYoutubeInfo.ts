import { AxiosError, AxiosResponse } from "axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from ".";
import { delay } from "@utils/delay";

interface YoutubeInfoRes {
  videoKey: string;
  category: string;
  publisher: string;
  datePublished: string;
}

interface Params {
  url: string;
}

const URL = "/answer-by-url";

export const useGetYoutubeInfo = (params: Params) => {
  return useSuspenseQuery<YoutubeInfoRes, AxiosError>({
    queryKey: [URL],
    // queryFn: () => api.POST<YoutubeInfoRes>(URL, params),
    queryFn: getYoutubeInfo,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};

async function getYoutubeInfo(): Promise<YoutubeInfoRes> {
  await delay(5000);
  return {
    videoKey: "1",
    category: "news",
    publisher: "leejeongho",
    datePublished: "2024-03-14",
  };
}
