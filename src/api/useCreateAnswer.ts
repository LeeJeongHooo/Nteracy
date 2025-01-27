import { useMutation } from "@tanstack/react-query";
import { api } from ".";

interface Params {
  userId: string;
  videokey: string;
  response1: string; // 출처 여부에 따른 사용자의 응답
  response2: string; // 사실 의견 분리 여부에 따른 사용자의 응답
  category: string;
  publisher: string;
  postDate: number; // 영상 게시일
}

const URL = "/save-responses";

export const useCreateAnswer = () => {
  return useMutation({ mutationFn: (params: Params) => api.POST(URL, params) });
};
