import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from ".";

interface YoutubeInfoRes {
  videoKey: string;
  category: string;
  publisher: string;
  datePublished: string;
}

interface Params {
  url: string;
}

export const useGetYoutubeInfo = (params: Params) => {
  return useSuspenseQuery({
    queryKey: [URL],
    queryFn: () => api.POST<YoutubeInfoRes>("/answer-by-url", params),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    select: (res) => res.data,
  });
};
