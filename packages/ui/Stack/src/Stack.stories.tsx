import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Stack } from "./Stack";

const meta = {
    title: "Layout/Stack",
    component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = () => {
    return (
        <Stack space="48px" elementType="div">
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </Stack>
    );
};
