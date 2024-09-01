import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Dropdown } from "./Dropdown.tsx";

const meta = {
    title: "Components/Dropdown",
    component: Dropdown,
    argTypes: {
        children: { control: "text" },
    },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: "Select an option" },
    render: () => (
        <Dropdown>
            <Dropdown.Trigger>Select an option</Dropdown.Trigger>
            <Dropdown.List>
                {[
                    "option 1",
                    "option 2",
                    "option 3",
                    "option 4",
                    "option 5",
                    "option 6",
                    "option 7",
                ].map((value, index) => (
                    <Dropdown.Option key={value} value={value} index={index} disabled={index === 3}>
                        {value}
                    </Dropdown.Option>
                ))}
            </Dropdown.List>
        </Dropdown>
    ),
};
