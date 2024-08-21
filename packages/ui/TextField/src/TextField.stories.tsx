import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TextField } from "./TextField.tsx";

const meta = {
    title: "Components/TextField",
    component: TextField,
    argTypes: {
        label: { control: "text" },
        placeholder: { control: "text" },
        errorMessage: { control: "text" },
        className: { control: "text" },
        disabled: { control: "boolean" },
        required: { control: "boolean" },
        readOnly: { control: "boolean" },
        onChange: { action: "changed" },
    },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Label",
        placeholder: "Placeholder",
    },
};

export const Controlled: Story = {
    args: {
        label: "Controlled Input",
        placeholder: "Type something...",
    },
    render: (args) => {
        const [value, setValue] = React.useState("");

        return (
            <TextField {...args} value={value} onChange={(event) => setValue(event.target.value)} />
        );
    },
};
