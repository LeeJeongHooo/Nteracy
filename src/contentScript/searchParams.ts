import { instance } from "../api/axiosBase";

export interface YoutubeId {
  videoId: string;
}

export const getSearchParam = (str: string) => {
  const searchParam = str && str !== "" ? str : window.location.search;

  if (!/\?([a-zA-Z0-9_]+)/i.exec(searchParam)) return {};
  let match: any,
    pl = /\+/g,
    search = /([^?&=]+)=?([^&]*)/g,
    decode = function (s: any) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    index = /\?([a-zA-Z0-9_]+)/i.exec(searchParam)["index"] + 1,
    query = searchParam.substring(index);

  let urlParams = {};
  while ((match = search.exec(query))) {
    urlParams[decode(match[1])] = decode(match[2]);
  }
  return urlParams;
};

export const getYoutubeParams = async () => {
  const video: { v?: string } = getSearchParam(window.location.href);

  const { data: basicData } = await instance.post("/answer-by-url", {
    url: `https://www.youtube.com/watch?v=${video.v}`,
  });

  const res = await instance.put("/view-gptanswer", {
    videokey: video.v,
  });

  return {
    videoId: video.v,
    category: basicData.category,
    publisher: basicData.publisher,
    datePublished: basicData.datePublished,
    gpt: res.data.gpt,
  };
};
