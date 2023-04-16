import React from 'react'
import './Controls.scss'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { incrementMonth, decrementMonth } from '../../redux/features/calendar/calnendarSlice';
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from '../../redux/selectors/themeSelector';
import { language } from '../../redux/selectors/languageSelector';
import { multiLang } from './../../multiLanguage/multiLanguage'

interface ControlsProps {
    month: number;
    year: number;
}

export const Controls: React.FC<ControlsProps> = ({ month, year }) => {
    const dispatch = useDispatch();
    const DarkMode = useSelector(selectIsDarkMode);
    const { langType } = useSelector(language);
    const selectedLang = multiLang[langType]

    const monthNamesLong = selectedLang.months;

    const handleNextMonth = () => {
        dispatch(incrementMonth());
    }

    const handlePrevMonth = () => {
        dispatch(decrementMonth());
    }

    const getYearAndMonth = (month: number, year: number) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return `${monthNamesLong[month - 1]} ${year}`
    }

    return (
        <div className={`Controls__monthSelector${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`}>
            <h3 className={`Controls__month${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`}>{getYearAndMonth(month, year)}</h3>
            <div className={`Controls__selectorArrows${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`}>
                <button className='Controls__Arrow' onClick={handlePrevMonth}><MdOutlineArrowBackIos /></button>
                <button className='Controls__Arrow' onClick={handleNextMonth}><MdOutlineArrowForwardIos /></button>
            </div>
        </div>
    )
}
