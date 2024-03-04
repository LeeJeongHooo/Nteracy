// 내부 라이브러리
import React, { useEffect, useState } from "react";
import { getYoutubeParams } from "./searchParams";
// api
import { instance } from "../api/axiosBase";

// 컴포넌트
import Header from "./components/Header/Header";
import Container from "./components/common/Container/Container";
import InformationCard from "./components/InformationCard/InformationCard";
import Button from "./components/common/Button/Button";
import ProgressBar from "./components/common/ProgressBar/ProgressBar";
import InputRadio from "./components/common/InputRadio/InputRadio";
import MyReponsesList from "./MyReponsesList";

export interface ResponseType {
  y: number;
  n: number;
  total: number;
}

export interface YoutubeParams {
  category: string;
  publisher: string;
  datePublished: string;
  videoId: string;
  gpt: string;
}

const DigitalLiteracy = () => {
  // 정보창 열기 닫기 버튼
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const [isReliable, setIsReliable] = useState("");
  const [isFact, setIsFact] = useState("");

  const [basicInfo, setBasicInfo] = useState<YoutubeParams>();
  const [reliableRes, setReliableRes] = useState<ResponseType>();
  const [factRes, setFactRes] = useState<ResponseType>();

  useEffect(() => {
    const getUserWatchDataApi = async () => {
      const youtubeData = await getYoutubeParams();

      setBasicInfo(youtubeData);
      const { email } = await chrome.runtime.sendMessage("oauth");
      if (!email) {
        return;
      } else {
        if (!youtubeData.videoId) {
          return;
        }
        const { data } = await instance.post("/viewby-userIdvideokey", {
          userId: email,
          videokey: youtubeData.videoId,
        });
        if (data === "") {
          return;
        } else {
          const { data: userReponses } = await instance.post(
            "viewanswer-byvideokey",
            {
              videokey: youtubeData.videoId,
            }
          );

          setReliableRes({
            y: userReponses.yesResponse1,
            n: userReponses.noResponse1,
            total: userReponses.total,
          });

          setFactRes({
            y: userReponses.yesResponse2,
            n: userReponses.noResponse2,
            total: userReponses.total2,
          });
        }
      }
    };
    getUserWatchDataApi();
  }, []);

  // 사용자 응답 제출 버튼
  const onSubmitUserResponse = async () => {
    const { email } = await chrome.runtime.sendMessage("oauth");
    if (!email) {
      alert("브라우저에서 로그인을 진행해주세요");
    } else {
      const { data: saveReponse } = await instance.post("/save-responses", {
        userId: email,
        videokey: basicInfo.videoId,
        response1: isReliable, //출처 여부에 따른 사용자의 응답
        response2: isFact, //사실 의견 분리 여부에 따른 사용자의 응답
        category: basicInfo.category,
        publisher: basicInfo.publisher,
        postDate: basicInfo.datePublished.replace(/-/g, ""), //영상 게시일
      });
      // 성공적으로 저장
      if (
        saveReponse.message ===
        "새로운 Response 객체를 생성하여 저장하고, Videokey 객체를 생성하여 저장하였습니다."
      ) {
        const { data: userReponses } = await instance.post(
          "viewanswer-byvideokey",
          {
            videokey: basicInfo.videoId,
          }
        );

        setReliableRes({
          y: userReponses.yesResponse1,
          n: userReponses.noResponse1,
          total: userReponses.total,
        });
        setFactRes({
          y: userReponses.yesResponse2,
          n: userReponses.noResponse2,
          total: userReponses.total2,
        });
      }
    }
  };

  // Information 창 열기
  const informationOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  // History 창 열기
  const historyOpenHandler = (isopen: boolean) => {
    setIsOpenHistory(isopen);
  };

  // 신뢰할 만한 출처 답변 Radio 헨들러
  const reliableChangeHandler = (val: any) => {
    setIsReliable(val);
  };

  // 사실/개인 의견 답변 Radio 헨들러
  const factChangeHandler = (val: any) => {
    setIsFact(val);
  };

  // 평가 완료 버튼 Validation
  const btnDisabled = !isFact || !isReliable;

  return (
    <Container>
      <Header
        isOpen={isOpen}
        isOpenHistory={isOpenHistory}
        onClick={informationOpenHandler}
        openHistory={historyOpenHandler}
      />

      {isOpen && !isOpenHistory && (
        <>
          <InformationCard title="기본 정보">
            <p className="text-base">
              카테고리:
              <strong className="font-[700]">{basicInfo?.category}</strong>
            </p>
            <p className="text-base">
              게시자:
              <strong className="font-[700]">{basicInfo?.publisher}</strong>
            </p>
            <p className="text-base">
              게시일:
              <strong className="font-[700]">{basicInfo?.datePublished}</strong>
            </p>
          </InformationCard>
          <InformationCard title="사실/의견 요약 정보">
            <p className="font-[400]">
              ※ 해당 정보는 GPT API에 의해 요약된 정보로, 영상을 비판적으로
              이해하기 위한 보조 도구로 사용하시길 바랍니다.
            </p>
            <p>{basicInfo?.gpt}</p>
          </InformationCard>
          <InformationCard title="사용자 평가">
            {/* 해당 영상 신뢰 */}
            <div className="mb-6">
              <p className="text-lg font-[500] mb-2">
                해당 영상이 신뢰할만한 출처를 포함하고 있나요?
              </p>
              <p className="mb-2">
                신뢰할만한 출처에는 주요 언론, 전문지, 시사주간지, 학술 자료,
                법령 및 판례, 통계 및 여론조사, 정부기관 등이 있습니다.
              </p>
              <div className="flex gap-2 mb-4">
                <InputRadio
                  data={isReliable}
                  value="Y"
                  setValue={reliableChangeHandler}
                  id="yes-reliable"
                  label="예"
                />
                <InputRadio
                  data={isReliable}
                  value="N"
                  setValue={reliableChangeHandler}
                  id="no-reliable"
                  label="아니오"
                />
              </div>
              {reliableRes && (
                <>
                  <p className="mb-4 text-mainBlue flex flex-col">
                    <strong className="font-[400]">
                      평가자 {reliableRes.total}명 중 {reliableRes.n}명이
                    </strong>
                    <span>
                      신뢰할만한 출처를 포함하고 있지 않다고 응답했습니다.
                    </span>
                  </p>
                  <ProgressBar responses={reliableRes} />
                </>
              )}
            </div>
            {/* 해당 영상 사실 / 개인 의견 */}
            <div className="mb-3">
              <p className="text-lg font-[500] mb-2">
                해당 영상에서 사실과 개인의 의견을 분리하고 있나요?
              </p>
              <p className="mb-2">
                ‘사실’은 실제로 있었던 일이나 현재에 있는 일을 의미하고,
                ‘의견’은 어떤 대상에 대하여 가지는 생각을 의미합니다.
              </p>
              <div className="flex gap-2 mb-4">
                <InputRadio
                  data={isFact}
                  value="Y"
                  setValue={factChangeHandler}
                  id="yes-fact"
                  label="예"
                />
                <InputRadio
                  data={isFact}
                  value="N"
                  setValue={factChangeHandler}
                  id="no-fact"
                  label="아니오"
                />
              </div>
              {factRes && (
                <>
                  <p className="mb-5 text-mainBlue flex flex-col">
                    <strong className="font-[400]">
                      평가자 {factRes.total}명 중 {factRes.n}
                      명이
                    </strong>
                    <span>
                      사실과 개인의 의견이 분리되어 있지 않다고 응답했습니다.
                    </span>
                  </p>
                  <ProgressBar responses={factRes} />
                </>
              )}
            </div>
            <Button onClick={onSubmitUserResponse} disabled={btnDisabled}>
              평가 완료
            </Button>
          </InformationCard>
        </>
      )}
      {isOpen && isOpenHistory && <MyReponsesList />}
    </Container>
  );
};

export default DigitalLiteracy;
