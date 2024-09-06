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
    labelledBy: string;
    currentDate: Date;
    selectedDate: Date | null;
    onSelect: (date: Date) => void;
    onMonthChange: (date: Date) => void;
    onCurrentDateChange: (date: Date) => void;
}

const DateGrid = ({
    currentDate,
    selectedDate,
    labelledBy,
    onSelect,
    onMonthChange,
    onCurrentDateChange,
}: DateGridProps) => {
    const gridRef = React.useRef<HTMLTableElement>(null);
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

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
            onCurrentDateChange(newDate);
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
                            const isSelected = selectedDate && isSameDay(date, selectedDate);
                            return (
                                <td
                                    key={date.toString()}
                                    className={`${dateCell.base} ${isSameMonth(date, currentDate) ? dateCell.isCurrentMonth : dateCell.isOtherMonth} ${isSelected ? dateCell.isSelected : ""}`}
                                    tabIndex={isSelected || isSameDay(date, currentDate) ? 0 : -1}
                                    data-date={format(date, "yyyy-MM-dd")}
                                    onKeyDown={(event) => handleKeyDown(event, date)}
                                    onClick={() => {
                                        onSelect(date);
                                    }}
                                    aria-selected={isSelected ? true : undefined}
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
