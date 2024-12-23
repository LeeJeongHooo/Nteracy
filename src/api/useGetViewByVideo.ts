import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from ".";

interface ViewByVideoRes {
  yesResponse1: number; //출처 여부에 따른 사용자의 응답
  noResponse1: number;
  yesResponse2: number; //사실 의견 분리 여부에 따른 사용자의 응답
  noResponse2: number;
  total: number; //출처 여부에 따른 사용자의 응답의 합
  total2: number; // 사실 의견 여부에 따른 사용자 응답의 합 --> 솔직히 둘다 안쓰여서 수정이 필요하시다면 수정하겠습니다..
}

interface Params {
  videoKey: string;
}

const URL = "/viewby-userIdvideokey";

export const useGetViewByVideo = (params: Params) => {
  return useQuery<AxiosResponse<ViewByVideoRes>, AxiosError>({
    queryKey: [URL],
    queryFn: () => api.PUT<ViewByVideoRes>(URL, params),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};
