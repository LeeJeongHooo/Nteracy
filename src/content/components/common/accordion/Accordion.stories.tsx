import { Meta, StoryObj } from "@storybook/react/*";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Component/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultValue: {
      description:
        "자식에서 상태를 관리하는 경우 초기 렌더링 과정에서만 아코디언이 열려있는지 닫혀있는 지 확인합니다.",
    },
    value: {
      description:
        "부모에서 상태를 관리하는 경우 Props로 내려받을 수 있습니다.",
      control: false,
    },
    onChangeValue: {
      description:
        "부모에서 상태를 관리하는 경우 onChangeValue를 활용하여 상태를 관리할 수 있습니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const Template: Story = {
  render: (args) => {
    return (
      <Accordion {...args}>
        <Accordion.Item value="Example">
          <Accordion.Header>
            <Accordion.Trigger>Trigger</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Content</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
  },
};

export const Open: Story = {
  ...Template,
  args: {
    defaultValue: ["Example"],
  },
};

export const Close: Story = {
  ...Template,
  args: {
    defaultValue: [],
  },
};

const MULTI_VALUE = ["Example1", "Example2"];

export const Multiple: Story = {
  argTypes: {
    value: { options: MULTI_VALUE, control: "check" },
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        {MULTI_VALUE.map((value, idx) => (
          <Accordion.Item value={value}>
            <Accordion.Header>
              <Accordion.Trigger>{`Trigger${idx + 1}`}</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>{`Content${idx + 1}`}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
};
