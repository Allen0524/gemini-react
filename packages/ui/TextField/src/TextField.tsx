import * as React from "react";
import {
    textFieldRecipe,
    textFieldErrorMessage,
    textFieldLabel,
    textFieldContainer,
} from "./style.css.ts";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errorMessage?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            id,
            label,
            errorMessage,
            disabled,
            placeholder,
            value: propValue,
            defaultValue = "",
            onChange,
            className,
            ...props
        },
        ref
    ) => {
        const uniqueId = React.useId();
        const inputId = id || `text-field-${uniqueId}`;
        const errorId = `${inputId}-error`;
        const inputClassName = `${textFieldRecipe({
            state: errorMessage ? "error" : disabled ? "disabled" : "default",
        })} ${className || ""}`;

        const [value, setValue] = useControllableState({ defaultValue, value: propValue });

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
            onChange?.(event);
        };

        return (
            <div className={textFieldContainer}>
                <label htmlFor={inputId} className={textFieldLabel}>
                    {label}
                </label>
                <input
                    {...props}
                    id={inputId}
                    ref={ref}
                    type="text"
                    className={inputClassName}
                    disabled={disabled}
                    aria-disabled={disabled}
                    aria-invalid={!!errorMessage}
                    aria-describedby={errorMessage ? errorId : undefined}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
                {errorMessage && (
                    <div id={errorId} className={textFieldErrorMessage} role="alert">
                        {errorMessage}
                    </div>
                )}
            </div>
        );
    }
);

export { TextField };

function useControllableState<T>({ defaultValue, value }: { defaultValue?: T; value?: T }) {
    const [internalValue, setInternalValue] = React.useState<T | undefined>(
        defaultValue ?? undefined
    );
    const isControlled = value !== undefined;
    const state = isControlled ? value : internalValue;

    const setState = (nextValue: T) => {
        if (!isControlled) {
            setInternalValue(nextValue);
        }
    };

    return [state, setState] as const;
}
