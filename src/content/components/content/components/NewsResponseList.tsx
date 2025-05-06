import { AnswerRes, useGetAnswerList } from "@api/useGetAnswerList";
import { Card } from "@content/components/card";
import { Text } from "@content/components/common/txt/Text";
import { useAuthContext } from "../auth/context";

export const NewsResponseList = () => {
  const { email } = useAuthContext();
  const { data: AnswerList } = useGetAnswerList({ userId: email });

  return (
    <ul>
      {AnswerList.map((item: AnswerRes) => {
        return (
          <li key={item.id}>
            <Card title={`${item.postDate} 열람`}>
              <Text as="p" className="nt-ellipsis">
                {item.gpt}
                <span>- {item.publisher}</span>
              </Text>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};
