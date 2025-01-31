import { Meta, StoryObj } from "@storybook/react/*";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Component/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  args: {},
  argTypes: {
    required: { description: "필수 항목인 경우 true로 설정이 가능합니다." },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Primary: Story = {
  args: {
    children: "label",
  },
};

export const Required: Story = {
  args: {
    ...Primary.args,
    required: true,
  },
};
