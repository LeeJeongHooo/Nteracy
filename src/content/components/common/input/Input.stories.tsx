import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Component/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    error: { description: "에러를 확인할 수 있습니다." },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: { placeholder: "placeholder" },
};

export const WithError: Story = {
  args: { ...Primary.args, error: true },
};
