import { cn } from "@utils/cn";

interface MessageProps {
  error?: boolean;
  message?: string;
}

export const Message = (props: MessageProps) => {
  const { error, message } = props;

  return (
    <p className={cn(error ? "text-red100" : "text-grey500")}>{message}</p>
  );
};
