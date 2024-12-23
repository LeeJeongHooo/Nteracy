import { useQuery } from "@tanstack/react-query";

interface Params {
  userId: string;
}

export const useGetReponseList = (params: Params) => {
  const { userId } = params;
  return useQuery({ queryKey: [URL, userId] });
};
