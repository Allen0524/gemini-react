import { createVar, style } from "@vanilla-extract/css";

export const paddingTop = createVar();

export type StackElementType = "div" | "span" | "ol" | "ul";

export const clx_block = style({
    paddingTop: paddingTop,
    display: "block"
})
