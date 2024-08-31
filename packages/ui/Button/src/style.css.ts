import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../../shared/styles";

export const buttonRecipe = recipe({
    base: {
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        border: "none",
        outline: "none",
        textDecoration: "none",
        minWidth: "80px",

        ":disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
        },

        ":focus-visible": {
            boxShadow: `0 0 0 3px ${vars.colors.sky[300]}`,
            outline: "none",
        },
    },
    variants: {
        variant: {
            primary: {
                backgroundColor: vars.colors.sky[700],
                color: vars.colors.neutral[100],
                selectors: {
                    "&:hover:not(:disabled)": {
                        backgroundColor: vars.colors.sky[800],
                    },
                    "&:active:not(:disabled)": {
                        backgroundColor: vars.colors.sky[900],
                    },
                },
            },
            secondary: {
                backgroundColor: vars.colors.neutral[100],
                color: vars.colors.sky[800],
                border: `2px solid ${vars.colors.sky[800]}`,
                selectors: {
                    "&:hover:not(:disabled)": {
                        backgroundColor: vars.colors.sky[100],
                        color: vars.colors.sky[900],
                        borderColor: vars.colors.sky[900],
                    },
                    "&:active:not(:disabled)": {
                        backgroundColor: vars.colors.sky[200],
                        color: vars.colors.sky[900],
                        borderColor: vars.colors.sky[900],
                    },
                },
            },
            tertiary: {
                backgroundColor: "transparent",
                color: vars.colors.sky[800],
                selectors: {
                    "&:hover:not(:disabled)": {
                        backgroundColor: vars.colors.sky[100],
                        color: vars.colors.sky[900],
                    },
                    "&:active:not(:disabled)": {
                        backgroundColor: vars.colors.sky[200],
                        color: vars.colors.sky[900],
                    },
                },
            },
        },
        size: {
            small: {
                padding: "8px 16px",
                fontSize: "14px",
            },
            medium: {
                padding: "12px 20px",
                fontSize: "16px",
            },
            large: {
                padding: "16px 24px",
                fontSize: "16px",
            },
        },
        fullWidth: {
            true: { width: "100%" },
        },
    },
});
