import { Meta, StoryObj } from "@storybook/react/*";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Component/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultValue: {
      description:
        "자식에서 상태를 관리하는 경우 초기 렌더링 과정에서만 선택된 탭을 선택할 수 있습니다.",
    },
    value: {
      description:
        "부모에서 상태를 관리하는 경우 선택된 탭 상태를 받을 수 있습니다.",
      control: false,
    },
    onChangeValue: {
      description:
        "부모에서 상태를 관리하는 경우 onChangeValue를 활용하여 상태를 관리할 수 있습니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const VALUES = ["Example1", "Example2"];

const Template: Story = {
  render: (args) => {
    return (
      <Tabs {...args}>
        <Tabs.List>
          {VALUES.map((value, idx) => (
            <Tabs.Trigger value={value}>{`Trigger${idx + 1}`}</Tabs.Trigger>
          ))}
        </Tabs.List>
        {VALUES.map((value, idx) => (
          <Tabs.Content value={value}>{`Content${idx + 1}`}</Tabs.Content>
        ))}
      </Tabs>
    );
  },
};

export const Primary: Story = {
  ...Template,
  args: {
    defaultValue: "Example1",
  },
};
