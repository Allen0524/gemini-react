import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "../../../shared/styles";

export const textFieldContainer = style({
    display: "flex",
    flexDirection: "column",
    gap: "6px",
});

export const textFieldLabel = style({
    color: vars.colors.neutral[900],
});

export const textFieldRecipe = recipe({
    base: {
        width: "100%",
        height: "auto",
        lineHeight: "1.5",
        boxSizing: "border-box",
        borderRadius: "8px",
        padding: "12px 16px",
        color: vars.colors.neutral[900],
        transition: "all 0.2s ease-in-out",

        ":focus": {
            backgroundColor: vars.colors.neutral[100],
            border: `2px solid ${vars.colors.sky[700]}`,
        },
        "::placeholder": {
            color: vars.colors.neutral[500],
        },
    },
    variants: {
        state: {
            default: {
                backgroundColor: vars.colors.neutral[100],
                border: `2px solid ${vars.colors.neutral[200]}`,
            },
            error: {
                backgroundColor: vars.colors.red[100],
                border: `2px solid ${vars.colors.red[700]}`,
            },
            disabled: {
                backgroundColor: vars.colors.neutral[200],
                border: `2px solid ${vars.colors.gray[300]}`,
                cursor: "not-allowed",
            },
        },
    },
});

export const textFieldErrorMessage = style({
    color: vars.colors.red[700],
});
