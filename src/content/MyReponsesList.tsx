import React, { useEffect, useState } from "react";
import InformationCard from "./components/InformationCard/InformationCard";
import { instance } from "../api/axiosBase";

interface listDataType {
  category: string;
  gpt: string;
  id: number;
  noResponse1: number;
  noResponse2: number;
  postDate: string;
  publisher: string;
  userId: string;
  videokey: string;
  yesResponse1: number;
  yesResponse2: number;
}

const MyReponsesList = () => {
  const [listData, setListData] = useState<listDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getMyReponsesData();
  }, []);

  // 사용자 응답 리스트 조회 API
  const getMyReponsesData = async () => {
    setIsLoading(true);
    const { email } = await chrome.runtime.sendMessage("oauth");
    if (!email) {
      alert("브라우저를 통해 로그인을 해주세요.");
      return;
    }
    const { data } = await instance.post(
      "/viewpagingdata-byuserId?page=1&size=15",
      { userId: email }
    );

    setListData(data.content);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && (
        <InformationCard title="데이터가 전송중입니다.">
          <p>잠시만 기달려주세요</p>
        </InformationCard>
      )}
      {!isLoading &&
        listData &&
        listData.map((item, idx) => {
          return (
            <a
              key={idx}
              href={`https://www.youtube.com/watch?v=${item.videokey}`}
            >
              <InformationCard title={`${item.postDate} 열람`}>
                <p className='"digital-literacy-ellipsis"'>{item.gpt}</p>
                <span>-{item.publisher}</span>
              </InformationCard>
            </a>
          );
        })}
      {!isLoading && listData.length === 0 && (
        <InformationCard title="전송된 데이터가 없습니다.">
          <p>아직 응답을 한 유튜브 영상이 없습니다.</p>
        </InformationCard>
      )}
    </>
  );
};

export default MyReponsesList;
