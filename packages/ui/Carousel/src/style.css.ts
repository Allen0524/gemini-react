import { style } from "@vanilla-extract/css";
import { vars } from "../../../shared/styles";

export const carouselStyles = {
    container: style({
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
        backgroundColor: vars.colors.slate[100],
    }),

    content: style({
        width: "100%",
        height: "100%",
        display: "flex",
        transition: "transform 0.5s ease",
    }),

    item: style({
        flexShrink: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        transition: "opacity 0.5s ease",
    }),

    controls: style({
        position: "absolute",
        top: "50%",
        left: "0",
        right: "0",
        display: "flex",
        justifyContent: "space-between",
        transform: "translateY(-50%)",
        zIndex: 1,
    }),

    controlsButton: style({
        backgroundColor: vars.colors.slate[700],
        color: vars.colors.slate[100],
        border: "none",
        padding: "10px 15px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        ":hover": {
            backgroundColor: vars.colors.slate[800],
        },
        ":focus-visible": {
            outline: `2px solid ${vars.colors.sky[400]}`,
            outlineOffset: "2px",
        },
    }),

    indicators: style({
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "10px",
        zIndex: 1,
    }),

    indicator: style({
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: vars.colors.slate[400],
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        ":hover": {
            backgroundColor: vars.colors.slate[600],
        },
        ":focus-visible": {
            outline: `2px solid ${vars.colors.sky[400]}`,
            outlineOffset: "2px",
        },
    }),

    activeIndicator: style({
        backgroundColor: vars.colors.sky[500],
        width: "14px",
        height: "14px",
    }),
};
