import * as React from "react";
import {
    eachDayOfInterval,
    format,
    startOfWeek,
    endOfWeek,
    endOfMonth,
    startOfMonth,
    isSameMonth,
    isSameDay,
    addDays,
} from "date-fns";
import { dateCell, dateGrid, weekdayHeader } from "./style.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DateGridProps {
    currentDate: Date;
    selectedDate: Date | null;
    onSelect: (date: Date) => void;
    onMonthChange: (date: Date) => void;
    labelledBy: string;
}

const DateGrid = ({
    currentDate,
    selectedDate,
    onSelect,
    onMonthChange,
    labelledBy,
}: DateGridProps) => {
    const gridRef = React.useRef<HTMLTableElement>(null);
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    React.useEffect(() => {
        const focusedDate = currentDate || selectedDate;
        const focusedCell = gridRef.current?.querySelector(
            `[data-date="${format(focusedDate, "yyyy-MM-dd")}"]`
        ) as HTMLTableCellElement;
        focusedCell?.focus();
    }, [selectedDate, currentDate]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTableCellElement>, date: Date) => {
        let newDate = date;
        switch (event.key) {
            case "ArrowUp":
                newDate = addDays(date, -7);
                break;
            case "ArrowDown":
                newDate = addDays(date, 7);
                break;
            case "ArrowLeft":
                newDate = addDays(date, -1);
                break;
            case "ArrowRight":
                newDate = addDays(date, 1);
                break;
            case "Home":
                newDate = startOfWeek(date);
                break;
            case "End":
                newDate = endOfWeek(date);
                break;
            case "PageUp":
                break;
            case "PageDown":
                break;
            case "Enter":
            case " ":
                event.preventDefault();
                onSelect(date);
                return;
            default:
                return;
        }

        event.preventDefault();

        if (!isSameMonth(newDate, currentDate)) {
            onMonthChange(newDate);
        } else {
            const newCell = gridRef.current?.querySelector(
                `[data-date="${format(newDate, "yyyy-MM-dd")}"]`
            ) as HTMLTableCellElement;
            newCell?.focus();
        }
    };

    return (
        <table ref={gridRef} role="grid" className={dateGrid} aria-labelledby={labelledBy}>
            <thead>
                <tr>
                    {WEEKDAYS.map((day) => (
                        <th key={day} className={weekdayHeader}>
                            {day.slice(0, 2)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: dateRange.length / 7 }).map((_, weekIndex) => (
                    <tr key={weekIndex}>
                        {dateRange.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date) => {
                            return (
                                <td
                                    key={date.toString()}
                                    className={`${dateCell.base} ${isSameMonth(date, currentDate) ? dateCell.isCurrentMonth : dateCell.isOtherMonth} ${selectedDate && isSameDay(date, selectedDate) ? dateCell.isSelected : ""}`}
                                    tabIndex={isSameDay(date, selectedDate || currentDate) ? 0 : -1}
                                    data-date={format(date, "yyyy-MM-dd")}
                                    onKeyDown={(event) => handleKeyDown(event, date)}
                                    onClick={() => {
                                        onSelect(date);
                                    }}
                                >
                                    {format(date, "d")}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export { DateGrid };
