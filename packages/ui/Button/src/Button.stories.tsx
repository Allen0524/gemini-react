import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "./Button.tsx";

const meta = {
    title: "Components/Button",
    component: Button,
    argTypes: {
        variant: {
            control: { type: "select", options: ["primary", "secondary", "tertiary"] },
        },
        size: {
            control: { type: "select", options: ["small", "medium", "large"] },
        },
        fullWidth: { control: "boolean" },
        disabled: { control: "boolean" },
        children: { control: "text" },
    },
    parameters: {
        docs: {
            description: {
                component: "A customizable button component with various styles and sizes.",
            },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: "Primary Button",
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        children: "Secondary Button",
        variant: "secondary",
    },
};

export const Tertiary: Story = {
    args: {
        children: "Tertiary Button",
        variant: "tertiary",
    },
};

export const Small: Story = {
    args: {
        children: "Small Button",
        size: "small",
    },
};

export const Medium: Story = {
    args: {
        children: "Medium Button",
        size: "medium",
    },
};

export const Large: Story = {
    args: {
        children: "Large Button",
        size: "large",
    },
};

export const FullWidth: Story = {
    args: {
        children: "Full Width Button",
        fullWidth: true,
    },
};

export const Disabled: Story = {
    args: {
        children: "Disabled Button",
        disabled: true,
    },
};

export const LongText: Story = {
    args: {
        children: "This is a button with a very long text to see how it handles overflow",
    },
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
        </div>
    ),
};

export const InteractiveExample: Story = {
    render: () => {
        const [count, setCount] = React.useState(0);
        return (
            <Button onClick={() => setCount(count + 1)}>
                Clicked {count} {count === 1 ? "time" : "times"}
            </Button>
        );
    },
};
