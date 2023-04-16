import React, { useEffect, useState } from 'react'
import { Controls } from '../Controls/Controls'
import { Calendar } from '../Calendar/Calendar'
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from '../../redux/selectors/themeSelector';
import { calendar } from './../../redux/selectors/calendarSelector';
import { DateInfoTable } from '../DateInfoTable/DateInfoTable';
import { Slots } from '../Slots/Slots';

import './CalendarContainer.scss'

export const CalendarContainer = () => {
  const currentDate = useSelector(calendar);
  const [month, setMonth] = useState(currentDate.month)
  const [year, setYear] = useState(currentDate.year)
  const [day, setDay] = useState(currentDate.day)
  const [selectedDay, setSelectedDay] = useState(currentDate.selectedDay)
  const DarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    setMonth(currentDate.month)
    setYear(currentDate.year)
    setSelectedDay(currentDate.selectedDay)
  }, [currentDate])

  return (
    <div className={`CalendarContainer__container${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`}>
      <div className={`CalendarContainer__calendar${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`}>
        <Controls month={month} year={year} />
        <Calendar month={month} year={year} day={day} select={selectedDay} />
        <Slots />
      </div>
      <DateInfoTable select={selectedDay} />
    </div>
  )
}
