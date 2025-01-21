import { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Component/TextField",
  component: TextField,
  parameters: { layout: "centered" },
  argTypes: {
    message: {
      description:
        "hint 텍스트가 있는 지 확인하고 텍스트를 보여줄 수 있습니다.",
    },
    error: {
      description: "에러가 있는 확인할 수 잇습니다.",
    },
    maxLength: {
      description:
        "maxLength를 통해 문자열 길이를 제한할 수 있습니다. 해당 prop 추가 시 자동으로 LengthCounter 컴포넌트가 생성됩니다.",
      type: "number",
    },
    onChange: {
      description: "Input 입력 간 onChange 핸들러를 동작시킬 수 있습니다.",
      type: "function",
    },
    value: {
      description: "제어 컴포넌트를 사용하는 경우 상태를 주입할 수 있습니다.",
      type: "string",
    },
    defaultValue: {
      description:
        "비제어 컴포넌트를 사용하는 경우 초기값 설정을 할 수 있습니다.",
      type: "string",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
  args: {
    placeholder: "placeholder",
  },
};

export const WithMessage: Story = {
  args: { ...Primary.args, message: "Hint Text" },
};

export const WithMessageAndError: Story = {
  args: { ...Primary.args, message: "Hint Text", error: true },
};

export const WithLengthCounter: Story = {
  args: { maxLength: 10 },
};

export const WithLengthCounterAndMessage: Story = {
  args: { message: "Hint Text", maxLength: 10 },
};
