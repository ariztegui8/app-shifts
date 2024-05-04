'use client'
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const CustomCalendar = () => {
    const [selectedDates, setSelectedDates] = useState(new Set());

    const handleDateClick = (date) => {
        const dateString = format(date, 'yyyy-MM-dd');
        const newSelection = new Set(selectedDates);
        if (newSelection.has(dateString)) {
            newSelection.delete(dateString);
        } else {
            newSelection.add(dateString);
        }
        setSelectedDates(newSelection);
    };

    const renderDays = () => {
        const startDate = startOfMonth(new Date());
        const endDate = endOfMonth(new Date());
        const dates = eachDayOfInterval({ start: startDate, end: endDate });

        return dates.map(date => {
            const dateString = format(date, 'yyyy-MM-dd');
            const isSelected = selectedDates.has(dateString);
            return (
                <button
                    key={dateString}
                    style={{ 
                        margin: 4, padding: 8, backgroundColor: isSelected ? 'blue' : 'lightgray'
                    }}
                    onClick={() => handleDateClick(date)}
                >
                    {format(date, 'dd')}
                </button>
            );
        });
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', width: 300 }}>
            {renderDays()}
        </div>
    );
};

export default CustomCalendar;