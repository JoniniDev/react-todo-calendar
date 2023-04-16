import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSelectedDay } from '../../redux/features/calendar/calnendarSlice';
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from '../../redux/selectors/themeSelector';
import { calendar } from '../../redux/selectors/calendarSelector';
import { language } from '../../redux/selectors/languageSelector';
import { multiLang } from './../../multiLanguage/multiLanguage'

import './Calendar.scss'

interface CalendarProps {
    month: number;
    year: number;
    day: number;
    select?: any;
}

export const Calendar: React.FC<CalendarProps> = ({ month, year, day, select }) => {
    const dispatch = useDispatch();
    const { langType } = useSelector(language);
    const selectedLang = multiLang[langType]
    const DarkMode = useSelector(selectIsDarkMode);
    const { calendarData } = useSelector(calendar);
    const date = new Date()
    const weekdaysShort: Array<any> = selectedLang.weekDayNames;
    const getDaysInMonth = (month: number, year: number) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from({ length: daysInMonth }, (par, i) => i + 1)
    }

    const buildCalendar = () => {
        const days = getDaysInMonth(month, year)
        const rows = [];

        for (let i = 0; i < days.length; i += 7) {
            const row = [];
            for (let j = i; j < i + 7 && j < days.length; j++) {
                row.push(<td className={`Calendar__day${j + 1 === select.day && year === select.year && month === select.month ? " selected" : ""}
                ${(month - 1 === date.getMonth() && year === date.getFullYear() && j + 1 === date.getDate()) ? " today" : ""}
                ${calendarData.find(slot => j + 1 === slot.day && year === slot.year && month === slot.month) ? " busy" : ""}
                ${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`} onClick={(e: any) => { dispatch(setSelectedDay({ day: Number(e.target.innerText), month, year })) }} key={j}>{days[j]}</td>);
            }
            rows.push(<tr className="Calendar__week" key={i}>{row}</tr>);
        }

        return (
            <table className={`Calendar__days${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`}>
                <thead>
                    <tr className={`Calendar__daysTitles${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`}>
                        {weekdaysShort.map((day) => { return <th className={`Calendar__dayTitle${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`} key={day}>{day}</th> })}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    return (
        <div className={`Calendar__weekdays${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`}>
            {/* {weekdaysShort.map((day) => { return <div className="Calendar__dayTitle" key={day}>{day}</div> })} */}
            {buildCalendar()}
        </div>
    )
}
