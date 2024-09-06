import * as React from "react";
import { format } from "date-fns";
import { DatePickerDialog } from "./DatePickerDialog";
import { chooseButton, dateInput, datePickerContainer } from "./style.css";
import { srOnly } from "../../../shared/styles";

interface DatePickerProps {
    value: Date | null;
    onChange: (date: Date) => void;
    dateFormat?: string;
}

const DatePicker = ({ value, onChange, dateFormat = "yyyy-MM-dd" }: DatePickerProps) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const descriptionId = React.useId();

    const handleButtonClick = () => setIsOpen(true);

    const handleDateSelect = (date: Date) => {
        onChange(date);
        setIsOpen(false);
        buttonRef.current?.focus();
    };

    const closeDialog = () => {
        setIsOpen(false);
        buttonRef.current?.focus();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <div className={datePickerContainer}>
            <input
                type="text"
                value={value ? format(value, dateFormat) : ""}
                onChange={handleInputChange}
                className={dateInput}
                aria-describedby={descriptionId}
                readOnly
            />
            <span id={descriptionId} className={srOnly}>
                Date format: {dateFormat}
            </span>
            <button
                type="button"
                ref={buttonRef}
                onClick={handleButtonClick}
                className={chooseButton}
            >
                Choose Date
            </button>
            {isOpen && (
                <DatePickerDialog
                    selectedDate={value}
                    dateFormat={dateFormat}
                    onSelect={handleDateSelect}
                    onClose={closeDialog}
                />
            )}
        </div>
    );
};

export { DatePicker };
