import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DatePicker } from "./DatePicker.tsx";

const meta = {
    title: "Components/DatePicker",
    component: DatePicker,
    argTypes: {},
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: new Date(),
        onChange: (date) => console.log(date),
    },
    render: () => {
        const [value, setValue] = React.useState<Date | null>(new Date());
        return <DatePicker value={value} onChange={setValue} />;
    },
};
