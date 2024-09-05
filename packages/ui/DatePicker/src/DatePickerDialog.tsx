import * as React from "react";
import { format, addMonths, addYears } from "date-fns";
import { DateGrid } from "./DateGrid";
import { dialog, dialogFooter, dialogHeader } from "./style.css";

interface DatePickerDialogProps {
    onClose: () => void;
    onSelect: (date: Date) => void;
    selectedDate: Date | null;
    dateFormat: string;
}

const DatePickerDialog = ({
    onClose,
    selectedDate,
    onSelect,
    dateFormat,
}: DatePickerDialogProps) => {
    const dialogRef = React.useRef<HTMLDivElement>(null);
    const [currentDate, setCurrentDate] = React.useState(selectedDate || new Date());
    const monthYearId = React.useId();

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Escape") onClose();
    };

    const changeMonth = (delta: number) => {
        setCurrentDate((prev) => addMonths(prev, delta));
    };

    const changeYear = (delta: number) => {
        setCurrentDate((prev) => addYears(prev, delta));
    };

    const handleMonthChange = (date: Date) => {
        setCurrentDate(date);
    };

    return (
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Choose Date"
            className={dialog}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
        >
            <div className={dialogHeader}>
                <button onClick={() => changeYear(-1)} aria-label="Previous Year">
                    &lt;&lt;
                </button>
                <button onClick={() => changeMonth(-1)} aria-label="Previous Month">
                    &lt;
                </button>
                <h2 id={monthYearId} aria-live="polite">
                    {format(currentDate, "MMMM yyyy")}
                </h2>
                <button onClick={() => changeMonth(1)} aria-label="Next Month">
                    &gt;
                </button>
                <button onClick={() => changeYear(1)} aria-label="Next Year">
                    &gt;&gt;
                </button>
            </div>
            <DateGrid
                currentDate={currentDate}
                selectedDate={selectedDate}
                onSelect={onSelect}
                onMonthChange={handleMonthChange}
                labelledBy={monthYearId}
            />
            <div className={dialogFooter}>
                <button onClick={onClose}>Cancel</button>
                <button onClick={() => onSelect(currentDate)}>OK</button>
            </div>
        </div>
    );
};

export { DatePickerDialog };
