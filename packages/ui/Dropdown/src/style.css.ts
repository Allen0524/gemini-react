import { style } from "@vanilla-extract/css";
import { vars } from "../../../shared/styles";

export const dropdownStyles = {
    container: style({
        position: "relative",
        width: "100%",
    }),

    trigger: style({
        width: "100%",
        padding: "0.5rem 1rem",
        backgroundColor: vars.colors.neutral[100],
        color: vars.colors.gray[900],
        border: `1px solid ${vars.colors.gray[300]}`,
        borderRadius: "0.25rem",
        textAlign: "left",
        cursor: "pointer",
        ":hover": {
            backgroundColor: vars.colors.sky[100],
            borderColor: vars.colors.sky[500],
        },
        ":focus-visible": {
            outline: "none",
            boxShadow: `0 0 0 3px ${vars.colors.sky[200]}`,
            borderColor: vars.colors.sky[500],
        },
    }),

    list: style({
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        overflowY: "auto",
        backgroundColor: vars.colors.neutral[100],
        border: `1px solid ${vars.colors.gray[300]}`,
        borderRadius: "0.25rem",
        zIndex: 10,
        boxShadow: `0 2px 4px ${vars.colors.gray[400]}`,
        listStyle: "none",
        padding: 0,
        margin: 0,
    }),

    option: style({
        padding: "0.5rem 1rem",
        cursor: "pointer",
        color: vars.colors.gray[900],
        ":hover": {
            backgroundColor: vars.colors.sky[100],
        },
        ":focus-visible": {
            outline: "none",
            backgroundColor: vars.colors.sky[200],
        },
    }),

    selectedOption: style({
        backgroundColor: vars.colors.sky[200],
        color: vars.colors.gray[900],
    }),

    disabledOption: style({
        color: vars.colors.gray[400],
        cursor: "not-allowed",
    }),
};
