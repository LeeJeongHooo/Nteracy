import { useGetYoutubeInfo } from "@api/useGetYoutubeInfo";
import { getSearchParams } from "@utils/getSearchParams";
import { Card } from "@content/components/card";
import { Text } from "@content/components/common/txt/Text";

export const YoutubeInfoContainer = () => {
  const videoKey = getSearchParams("v");

  const { data: youtubeInfo } = useGetYoutubeInfo({
    url: `https://www.youtube.com/watch?v=${videoKey}`,
  });

  return (
    <Card title="기본 정보" className="text-sm">
      <Text as="p" className="text-sm">
        카테고리:
        <span className="font-medium">{youtubeInfo.category}</span>
      </Text>
      <Text as="p" className="text-sm">
        게시자:
        <span className="font-medium">{youtubeInfo.publisher}</span>
      </Text>
      <Text as="p">
        게시일:
        <span className="font-medium">{youtubeInfo.datePublished}</span>
      </Text>
    </Card>
  );
};
