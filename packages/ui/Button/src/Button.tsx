import * as React from "react";
import { buttonRecipe } from "./style.css.ts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary";
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
}

const Button = ({
    children,
    variant = "primary",
    size = "medium",
    fullWidth = false,
    disabled,
    className,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`${buttonRecipe({ variant, size, fullWidth })} ${className || ""}`}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export { Button };
