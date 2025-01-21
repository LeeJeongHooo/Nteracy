import { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";
import { Fragment } from "react/jsx-runtime";

const meta: Meta<typeof Skeleton> = {
  title: "Component/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  args: {
    className: "w-96 h-36",
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {};

export const List: Story = {
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
