import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsDarkMode } from '../../redux/selectors/themeSelector';
import { BsCheck2 } from 'react-icons/bs';
import { calendar } from './../../redux/selectors/calendarSelector';
import { addCalendarData, removeCalendarData, setSelectedDay } from '../../redux/features/calendar/calnendarSlice'
import { Modal } from '../Modal/Modal';
import { v4 as uuidv4 } from 'uuid';
import { openModal } from '../../redux/features/modal/modalSlice';
import { multiLang } from '../../multiLanguage/multiLanguage';
import { language } from '../../redux/selectors/languageSelector';

import "./DateInfoTable.scss"

interface DateInfoTable {
    select?: any;
}

interface Calendar {
    day: number;
    month: number;
    year: number;
    selectedDay?: any;
    calendarData: PayloadObject[];
}

interface PayloadObject {
    id: string;
    year: number;
    month: number;
    day: number;
    time: string;
}

export const DateInfoTable: React.FC<DateInfoTable> = ({ select }) => {
    const DarkMode = useSelector(selectIsDarkMode);
    const calendarSelector: Calendar = useSelector(calendar);
    const dispatch = useDispatch();
    const { langType } = useSelector(language);
    const selectedLang = multiLang[langType]
    const monthNamesLong = selectedLang.months;

    const handleBookSlot = () => {
        const isSlotBusy = checkBusySlot()
        if (!isSlotBusy) {
            dispatch(addCalendarData({
                id: uuidv4(),
                day: calendarSelector.selectedDay.day,
                month: calendarSelector.selectedDay.month,
                year: calendarSelector.selectedDay.year,
                time: calendarSelector.selectedDay.time
            }))
        } else {
            const findedDate: PayloadObject | null = calendarSelector.calendarData.find(book =>
                book.time === calendarSelector.selectedDay.time &&
                book.day === calendarSelector.selectedDay.day &&
                book.month === calendarSelector.selectedDay.month &&
                book.year === calendarSelector.selectedDay.year) || null
            if (findedDate) {
                dispatch(setSelectedDay({ ...calendarSelector.selectedDay, id: findedDate.id }))
            }
            dispatch(openModal({ id: "DeleteSlot" }))
        }
    }

    const checkBusySlot = () => {
        return calendarSelector.calendarData.find(book =>
            book.time === calendarSelector.selectedDay.time &&
            book.day === calendarSelector.selectedDay.day &&
            book.month === calendarSelector.selectedDay.month &&
            book.year === calendarSelector.selectedDay.year)
    }

    return (
        <>
            <Modal id="DeleteSlot" />
            {select.time ? (<h2 className={`DateInfoTable__text${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`}>{`${select.day} ${monthNamesLong[select.month - 1]} ${select.year} ${select.time}`}</h2>) : null}
            {select.time ?
                (<button className='DateInfoTable__button' onClick={handleBookSlot}>
                    <BsCheck2 className='DateInfoTable__buttonIcon' />
                    <p className='DateInfoTable__buttonText'>
                        {selectedLang.texts.accept}
                    </p>
                </button>)
                : null
            }
        </>
    );
};