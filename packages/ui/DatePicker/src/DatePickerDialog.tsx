import * as React from "react";
import { format, addMonths, addYears } from "date-fns";
import { DateGrid } from "./DateGrid";
import {
    dialog,
    dialogFooter,
    dialogHeader,
    monthYearHeader,
    navigationButton,
    dialogFooterButton,
} from "./style.css";
import useClickOutside from "../../../shared/hooks/useClickOutside";

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
    const isUpdateByNavigation = React.useRef(false);
    const monthYearId = React.useId();
    useClickOutside(dialogRef, onClose);

    React.useEffect(() => {
        if (isUpdateByNavigation.current) {
            isUpdateByNavigation.current = false;
            return;
        }
        const focusedDate = currentDate || selectedDate;
        const focusedCell = dialogRef.current?.querySelector(
            `[data-date="${format(focusedDate, "yyyy-MM-dd")}"]`
        ) as HTMLTableCellElement;
        focusedCell?.focus();
    }, [selectedDate, currentDate]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Escape") onClose();
    };

    const changeMonth = (delta: number) => {
        setCurrentDate((prev) => addMonths(prev, delta));
        isUpdateByNavigation.current = true;
    };

    const changeYear = (delta: number) => {
        setCurrentDate((prev) => addYears(prev, delta));
        isUpdateByNavigation.current = true;
    };

    const handleMonthChange = (date: Date) => {
        setCurrentDate(date);
    };

    const handleCurrentDateChange = (date: Date) => {
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
                <button
                    onClick={() => changeYear(-1)}
                    aria-label="Previous Year"
                    className={navigationButton}
                >
                    &lt;&lt;
                </button>
                <button
                    onClick={() => changeMonth(-1)}
                    aria-label="Previous Month"
                    className={navigationButton}
                >
                    &lt;
                </button>
                <h2 id={monthYearId} aria-live="polite" className={monthYearHeader}>
                    {format(currentDate, "MMMM yyyy")}
                </h2>
                <button
                    onClick={() => changeMonth(1)}
                    aria-label="Next Month"
                    className={navigationButton}
                >
                    &gt;
                </button>
                <button
                    onClick={() => changeYear(1)}
                    aria-label="Next Year"
                    className={navigationButton}
                >
                    &gt;&gt;
                </button>
            </div>
            <DateGrid
                currentDate={currentDate}
                selectedDate={selectedDate}
                onSelect={onSelect}
                onMonthChange={handleMonthChange}
                onCurrentDateChange={handleCurrentDateChange}
                labelledBy={monthYearId}
            />
            <div className={dialogFooter}>
                <button
                    onClick={onClose}
                    className={`${dialogFooterButton.base} ${dialogFooterButton.cancel}`}
                >
                    Cancel
                </button>
                <button
                    onClick={() => onSelect(currentDate)}
                    className={`${dialogFooterButton.base} ${dialogFooterButton.ok}`}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export { DatePickerDialog };
