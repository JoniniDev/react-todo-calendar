import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay } from '../../redux/features/calendar/calnendarSlice'
import { calendar } from './../../redux/selectors/calendarSelector';

import "./Slots.scss"

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


export const Slots = () => {
    const calendarSelector: Calendar = useSelector(calendar);
    const dispatch = useDispatch();

    const handleSelectTime = (e: any) => {
        dispatch(setSelectedDay({
            ...calendarSelector.selectedDay,
            time: e.target.innerText
        }))
    }

    const checkBusySlot = (time: string) => {
        return calendarSelector.calendarData.find(book =>
            book.time === time &&
            book.day === calendarSelector.selectedDay.day &&
            book.month === calendarSelector.selectedDay.month &&
            book.year === calendarSelector.selectedDay.year)
    }

    const checkSelectedSlot = (time: string) => {
        return calendarSelector.selectedDay.time === time
    }

    return (
        <div className='Slots__container'>
            { // Тут должны быть данные с сервера, но для примера просто мапирую статический массив
                ["10:00", "12:00", "16:00", "18:00"].map(slot => {
                    return <button className={`Slots__button ${checkSelectedSlot(slot) ? " Slots__selected" : ""} ${checkBusySlot(slot) ? " Slots__active" : ""}`} onClick={handleSelectTime}>{slot}</button>
                })}
        </div>
    );
};