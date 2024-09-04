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
} from "date-fns";
import { dateCell, dateGrid } from "./style.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DateGridProps {
    currentDate: Date;
    selectedDate: Date | null;
    onSelect: (date: Date) => void;
}

const DateGrid = ({ currentDate, selectedDate, onSelect }: DateGridProps) => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
    return (
        <table role="grid" className={dateGrid}>
            <thead>
                <tr>
                    {WEEKDAYS.map((day) => (
                        <th key={day}>{day.slice(0, 2)}</th>
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
