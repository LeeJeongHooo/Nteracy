import { useSuspenseQuery } from "@tanstack/react-query";

interface Params {
  userId: string;
}

const URL = "/viewpagingdata-byuserId";

export const useGetAnswerList = (params: Params) => {
  const { userId } = params;
  return useSuspenseQuery({ queryKey: [URL, userId] });
};
