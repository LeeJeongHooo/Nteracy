import { Meta, StoryObj, Decorator } from "@storybook/react/*";
import { Progress } from "./Progress";

const decorator: Decorator = (story) => {
  return <div className="w-[376px]">{story()}</div>;
};

const meta: Meta<typeof Progress> = {
  title: "Component/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  args: { max: 100, className: "h-9" },
  argTypes: {
    max: {
      description: "기본값은 100으로 Progress의 최대값을 입력할 수 있습니다.",
    },
    value: {
      description: "Progress 값을 입력할 수 있습니다.",
      type: "number",
    },

    className: {
      description: "Tailwind 기반으로 높이를 입력받을 수 있습니다.",
      control: false,
    },
  },
  decorators: [decorator],
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Primary: Story = {
  args: {
    value: 50,
  },
};
