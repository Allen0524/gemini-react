import * as React from "react";
import { format } from "date-fns";
import { DatePickerDialog } from "./DatePickerDialog";
import { chooseButton, dateInput, datePickerContainer } from "./style.css";

interface DatePickerProps {
    value: Date | null;
    onChange: (date: Date) => void;
    dateFormat?: string;
}

const DatePicker = ({ value, onChange, dateFormat = "yyyy-MM-dd" }: DatePickerProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleButtonClick = () => setIsOpen(true);

    const handleDateSelect = (date: Date) => {
        onChange(date);
        setIsOpen(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <div className={datePickerContainer}>
            <input
                type="text"
                value={value ? format(value, dateFormat) : ""}
                onChange={handleInputChange}
                className={dateInput}
            />
            <button onClick={handleButtonClick} className={chooseButton}>
                choose Date
            </button>
            {isOpen && (
                <DatePickerDialog
                    onClose={() => setIsOpen(false)}
                    selectedDate={value}
                    onSelect={handleDateSelect}
                    dateFormat={dateFormat}
                />
            )}
        </div>
    );
};

export { DatePicker };
