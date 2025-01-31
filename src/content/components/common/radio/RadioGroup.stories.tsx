import { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Component/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultValue: {
      description:
        "자식에서 상태를 관리하는 경우 초기 렌더링 과정에서만 defaultValue를 설정할 수 있습니다.",
    },
    value: {
      description:
        "부모에서 상태를 관리하는 경우 Props로 내려받을 수 있습니다.  * defaultValue와 함께 사용할 수 없습니다.",
    },
    onChangeValue: {
      description:
        "부모에서 상태를 관리하는 경우 onChangeValue를 활용하여 상태를 관리할 수 있습니다.",
    },

    disabled: {
      description: "Radio버튼들의 비활성화를 전역으로 관리할 수 있습니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const Template: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroup.Item value="item1">Item1</RadioGroup.Item>
      <RadioGroup.Item value="item2">Item2</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const Primary: Story = { ...Template };

export const Disabled: Story = {
  args: { disabled: true },
  ...Template,
};

export const RadioDisabled: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroup.Item value="item1" disabled>
        Item1
      </RadioGroup.Item>
      <RadioGroup.Item value="item2">Item2</RadioGroup.Item>
    </RadioGroup>
  ),
};
