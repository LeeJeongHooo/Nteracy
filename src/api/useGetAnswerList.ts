import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from ".";

interface Params {
  userId: string;
}

export interface AnswerRes {
  id: number;
  userId: string;
  videokey: string;
  gpt: string;
  category: string;
  publisher: string;
  postDate: string;
}

export const useGetAnswerList = (params: Params) => {
  const { userId } = params;
  return useSuspenseQuery({
    queryKey: [URL, userId],
    queryFn: () => api.POST<AnswerRes[]>("/viewpagingdata-byuserId", params),
    select: (res) => res.data,
  });
};
