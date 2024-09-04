import { style, styleVariants } from "@vanilla-extract/css";

export const datePickerContainer = style({
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
});

export const dateInput = style({
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
});

export const chooseButton = style({
    marginTop: "0.5rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    ":hover": {
        backgroundColor: "#0056b3",
    },
    ":focus": {
        outline: "2px solid #0056b3",
        outlineOffset: "2px",
    },
});

export const dialog = style({
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
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
    borderCollapse: "collapse",
});

export const dateCell = styleVariants({
    base: {
        padding: "0.5rem",
        textAlign: "center",
        cursor: "pointer",
        ":focus": {
            outline: "2px solid #007bff",
            outlineOffset: "2px",
        },
    },
    isCurrentMonth: {
        color: "black",
    },
    isOtherMonth: {
        color: "#ccc",
    },
    isSelected: {
        backgroundColor: "#007bff",
        color: "white",
    },
});
