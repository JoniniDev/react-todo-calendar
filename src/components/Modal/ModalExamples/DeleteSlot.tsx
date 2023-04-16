import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/features/modal/modalSlice';
import { modal } from '../../../redux/selectors/modalSelector';
import { removeCalendarData } from '../../../redux/features/calendar/calnendarSlice';
import { calendar } from '../../../redux/selectors/calendarSelector';
import { language } from '../../../redux/selectors/languageSelector';
import { multiLang } from '../../../multiLanguage/multiLanguage';

import './DeleteSlot.scss'

interface Modal {
    isOpened: boolean;
    id: string;
}

interface Calendar {
    day: number;
    month: number;
    year: number;
    selectedDay?: PayloadObject;
    calendarData: PayloadObject[];
}

interface PayloadObject {
    id: string;
    year: number;
    month: number;
    day: number;
    time: string;
}

export const DeleteSlot = () => {
    const dispatch = useDispatch()
    const { langType } = useSelector(language);
    const selectedLang = multiLang[langType]
    const modalSelector: Modal = useSelector(modal)
    const calendarSelector: Calendar = useSelector(calendar)

    const handleClickYes = () => {
        if (calendarSelector.selectedDay) {
            dispatch(removeCalendarData({ id: calendarSelector.selectedDay.id }))
        }
        dispatch(closeModal({ id: modalSelector.id }))
    }

    const handleClickNo = () => {
        dispatch(closeModal({ id: modalSelector.id }))
    }

    return (
        <div>
            {selectedLang.texts.modalText}
            <div className='DeleteSlot__Container'>
                <button className='DeleteSlot__Button' onClick={handleClickYes}>{selectedLang.texts.modalYes}</button>
                <button className='DeleteSlot__Button' onClick={handleClickNo}>{selectedLang.texts.modalNo}</button>
            </div>
        </div>
    )
}
