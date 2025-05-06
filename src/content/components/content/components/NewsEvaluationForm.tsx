import { FormEvent, useState } from "react";
import { useGetVideoUserAnswer } from "@api/useGetVideoUserAnswer";
import { Button } from "@content/components/common/button";
import { Progress } from "@content/components/common/progress";
import { RadioGroup } from "@content/components/common/radio";
import { Text } from "@content/components/common/txt/Text";
import { getSearchParams } from "@utils/getSearchParams";
import { useCreateAnswer } from "@api/useCreateAnswer";
import { BackgroundRequest } from "@background/const";

export const NewsEvaluationForm = () => {
  const videoKey = getSearchParams("v");
  const { data: userAnswer } = useGetVideoUserAnswer({
    videokey: videoKey as string,
  });

  const { mutateAsync: createAnswer } = useCreateAnswer();

  const [reliableRadioValue, setReliableRadioValue] = useState("y");
  const handleChangeReliable = (value: string) => {
    setReliableRadioValue(value);
  };

  const [factRadioValue, setFactRadioValue] = useState("y");
  const handleChangeFact = (value: string) => {
    setFactRadioValue(value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    chrome.runtime.sendMessage(BackgroundRequest.OAUTH, (response) => {
      if (!response.email || !videoKey) {
        alert("로그인을 해주세요.");
        return;
      }

      createAnswer({
        userId: response.email as string,
        videokey: videoKey as string,
        response1: reliableRadioValue,
        response2: factRadioValue,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <Text as="p" className="text-base font-medium mb-2">
          해당 영상이 신뢰할만한 출처를 포함하고 있나요?
        </Text>
        <Text as="p" className="mb-2">
          신뢰할만한 출처에는 주요 언론, 전문지, 시사주간지, 학술 자료, 법령 및
          판례, 통계 및 여론조사, 정부기관 등이 있습니다.
        </Text>
        <RadioGroup
          className="flex mb-4"
          value={reliableRadioValue}
          onChangeValue={handleChangeReliable}
        >
          <RadioGroup.Item className="w-2/4" value="y">
            예
          </RadioGroup.Item>
          <RadioGroup.Item className="w-2/4" value="n">
            아니오
          </RadioGroup.Item>
        </RadioGroup>
        <Text as="p" className="text-primary300 text-sm  font-medium">
          {`평가자 ${userAnswer.total}명 중 ${userAnswer.yesResponse1}명이 신뢰할만한 출처를 포함하고 있지 않다고
          응답했습니다.`}
        </Text>
        <Progress
          className="h-9 rounded"
          value={userAnswer.yesResponse1}
          max={userAnswer.total}
        />
      </div>
      <div className="mb-2">
        <Text as="p" className="text-base font-medium mb-2">
          해당 영상에서 사실과 개인의 의견을 분리하고 있나요?
        </Text>
        <Text as="p" className="mb-2">
          ‘사실’은 실제로 있었던 일이나 현재에 있는 일을 의미하고, ‘의견’은 어떤
          대상에 대하여 가지는 생각을 의미합니다.
        </Text>
        <RadioGroup
          className="flex mb-4"
          value={factRadioValue}
          onChangeValue={handleChangeFact}
        >
          <RadioGroup.Item className="w-2/4" value="y">
            예
          </RadioGroup.Item>
          <RadioGroup.Item className="w-2/4" value="n">
            아니오
          </RadioGroup.Item>
        </RadioGroup>
        <Text as="p" className="mb-2 text-sm text-primary300 font-medium">
          {`평가자 ${userAnswer.total2}명 중 ${userAnswer.yesResponse2}명이 사실과 개인의 의견이 분리되어 있지
          않다고 응답했습니다.`}
        </Text>
        <Progress
          className="h-9 rounded"
          value={userAnswer.yesResponse2}
          max={userAnswer.total2}
        />
      </div>
      <Button className="w-full" type="submit">
        평가 완료
      </Button>
    </form>
  );
};
