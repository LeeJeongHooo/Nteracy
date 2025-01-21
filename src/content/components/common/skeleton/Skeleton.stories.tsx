import { Decorator, Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";
import { Fragment } from "react/jsx-runtime";

const decorator: Decorator = (story) => {
  return (
    <div className="flex flex-col items-center justify-center">{story()}</div>
  );
};

const meta: Meta<typeof Skeleton> = {
  title: "Component/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [decorator],
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {
  args: {
    className: "w-96 h-36",
  },
};

export const List: Story = {
  args: {
    className: "w-96 h-36",
  },
  render: (args) => {
    return (
      <Fragment>
        {Array.from({ length: 4 }, (_, idx) => (
          <Skeleton {...args} key={idx} />
        ))}
      </Fragment>
    );
  },
};
