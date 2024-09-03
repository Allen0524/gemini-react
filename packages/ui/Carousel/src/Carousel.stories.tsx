import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Carousel } from "./Carousel.tsx";

const meta = {
    title: "Components/Carousel",
    component: Carousel,
    argTypes: {
        items: { control: "object" },
        autoPlay: { control: "boolean" },
        interval: { control: "number" },
    },
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
    {
        id: 1,
        content: (
            <div
                style={{
                    background: "lightblue",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Slide 1
            </div>
        ),
    },
    {
        id: 2,
        content: (
            <div
                style={{
                    background: "lightgreen",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Slide 2
            </div>
        ),
    },
    {
        id: 3,
        content: (
            <div
                style={{
                    background: "lightpink",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Slide 3
            </div>
        ),
    },
    {
        id: 4,
        content: (
            <div
                style={{
                    background: "lightyellow",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Slide 4
            </div>
        ),
    },
    {
        id: 5,
        content: (
            <div
                style={{
                    background: "lightgray",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Slide 5
            </div>
        ),
    },
];

export const Default: Story = {
    args: {
        items: defaultItems,
        autoPlay: false,
        interval: 3000,
        label: "Default carousel",
    },
};

export const AutoPlay: Story = {
    args: {
        ...Default.args,
        autoPlay: true,
    },
};

export const WithImages: Story = {
    args: {
        ...Default.args,
        items: [
            {
                id: 1,
                content: (
                    <img
                        src="https://picsum.photos/id/1018/600/400"
                        alt="Mountain"
                        style={{ width: "100%", height: "400px", objectFit: "cover" }}
                    />
                ),
            },
            {
                id: 2,
                content: (
                    <img
                        src="https://picsum.photos/id/1015/600/400"
                        alt="River"
                        style={{ width: "100%", height: "400px", objectFit: "cover" }}
                    />
                ),
            },
            {
                id: 3,
                content: (
                    <img
                        src="https://picsum.photos/id/1019/600/400"
                        alt="Forest"
                        style={{ width: "100%", height: "400px", objectFit: "cover" }}
                    />
                ),
            },
        ],
    },
};
