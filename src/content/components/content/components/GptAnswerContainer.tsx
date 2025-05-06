import { useGetGptAnswer } from "@api/useGetGptAnswer";
import { Card } from "@content/components/card";
import { Text } from "@content/components/common/txt/Text";
import { getSearchParams } from "@utils/getSearchParams";
import { useAuthContext } from "../auth/context";

const GPT_TEXT =
  "※ 해당 정보는 GPT API에 의해 요약된 정보로, 영상을 비판적으로 이해하기 위한 보조 도구로 사용하시길 바랍니다.";

export const GptAnswerContainer = () => {
  const videoKey = getSearchParams("v");
  const { email } = useAuthContext();
  const { data: gptAnswer } = useGetGptAnswer({
    userId: email,
    videokey: videoKey as string,
  });

  return (
    <Card title="사실/의견 요약 정보">
      <Text as="p" className="font-normal">
        {GPT_TEXT}
      </Text>
      <Text as="p" className="nt-ellipsis">
        {gptAnswer.gpt}
      </Text>
    </Card>
  );
};
