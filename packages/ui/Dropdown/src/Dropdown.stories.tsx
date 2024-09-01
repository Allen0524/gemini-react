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
                    <Dropdown.Option key={value} value={value} index={index}>
                        {value}
                    </Dropdown.Option>
                ))}
            </Dropdown.List>
        </Dropdown>
    ),
};

export const WithDisabledOptions: Story = {
    args: { children: "Select an option" },
    render: () => (
        <Dropdown>
            <Dropdown.Trigger>Select an option</Dropdown.Trigger>
            <Dropdown.List>
                {[
                    { value: "option 1", disabled: false },
                    { value: "option 2", disabled: false },
                    { value: "option 3", disabled: true },
                    { value: "option 4", disabled: false },
                    { value: "option 5", disabled: false },
                ].map((option) => (
                    <Dropdown.Option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.value}
                    </Dropdown.Option>
                ))}
            </Dropdown.List>
        </Dropdown>
    ),
};

export const PreselectedOption: Story = {
    args: { children: "Select an option" },
    render: () => {
        const [selectedValue, setSelectedValue] = React.useState("option 2");

        return (
            <Dropdown
                onSelect={(value) => {
                    console.log("received value", value);
                    setSelectedValue(value);
                }}
            >
                <Dropdown.Trigger>{selectedValue}</Dropdown.Trigger>
                <Dropdown.List>
                    {["option 1", "option 2", "option 3", "option 4", "option 5"].map((value) => (
                        <Dropdown.Option key={value} value={value}>
                            {value}
                        </Dropdown.Option>
                    ))}
                </Dropdown.List>
            </Dropdown>
        );
    },
};
