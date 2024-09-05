import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../shared/styles";

export const datePickerContainer = style({
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
});

export const dateInput = style({
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: `1px solid ${vars.colors.slate[300]}`,
    color: vars.colors.slate[900],
    backgroundColor: vars.colors.slate[100],
});

export const chooseButton = style({
    marginTop: "0.5rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: vars.colors.sky[600],
    color: vars.colors.slate[100],
    cursor: "pointer",
    ":hover": {
        backgroundColor: vars.colors.sky[700],
    },
    ":focus": {
        outline: `2px solid ${vars.colors.sky[400]}`,
        outlineOffset: "2px",
    },
});

export const dialog = style({
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: vars.colors.slate[100],
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: `0 4px 6px ${vars.colors.slate[400]}`,
    zIndex: 1000,
    color: vars.colors.slate[900],
});

export const dialogHeader = style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
});

export const dialogFooter = style({
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
});

export const dateGrid = style({
    borderCollapse: "separate",
    borderSpacing: "2px",
    width: "100%",
});

export const dateCell = styleVariants({
    base: {
        padding: "0.5rem",
        textAlign: "center",
        cursor: "pointer",
        width: "40px",
        lineHeight: "40px",
        borderRadius: `1px solid ${vars.colors.slate[400]}`,
        ":focus": {
            outline: `2px solid ${vars.colors.sky[400]}`,
            outlineOffset: "2px",
        },
        ":hover": {
            backgroundColor: vars.colors.sky[200],
        },
    },
    isCurrentMonth: {
        color: vars.colors.slate[900],
    },
    isOtherMonth: {
        color: vars.colors.slate[400],
    },
    isSelected: {
        backgroundColor: vars.colors.sky[600],
        color: vars.colors.slate[100],
        fontWeight: "bold",
    },
});

export const weekdayHeader = style({
    fontWeight: "bold",
    color: vars.colors.slate[600],
    padding: "0.5rem",
    textAlign: "center",
});

export const monthYearHeader = style({
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: "0 0.5rem",
    color: vars.colors.slate[900],
});

export const navigationButton = style({
    padding: "0.25rem 0.5rem",
    fontSize: "1.2rem",
    borderRadius: "none",
    border: "none",
    background: "none",
    color: vars.colors.slate[700],
    cursor: "pointer",
    ":hover": {
        backgroundColor: vars.colors.slate[200],
    },
    ":focus": {
        outline: `2px solid ${vars.colors.sky[400]}`,
        outlineOffset: "2px",
    },
});

export const dialogFooterButton = styleVariants({
    base: {
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        marginLeft: "0.5rem",
        transition: "background-color 0.3s",
        ":focus": {
            outline: `2px solid ${vars.colors.sky[400]}`,
            outlineOffset: "2px",
        },
    },
    cancel: {
        backgroundColor: vars.colors.slate[300],
        color: vars.colors.slate[900],
        ":hover": {
            backgroundColor: vars.colors.slate[400],
        },
    },
    ok: {
        backgroundColor: vars.colors.sky[600],
        color: vars.colors.slate[100],
        ":hover": {
            backgroundColor: vars.colors.sky[700],
        },
    },
});
