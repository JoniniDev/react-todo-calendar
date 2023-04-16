import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay } from '../../redux/features/calendar/calnendarSlice'
import { selectIsDarkMode } from '../../redux/selectors/themeSelector';
import { modal } from './../../redux/selectors/modalSelector';
import { closeModal } from '../../redux/features/modal/modalSlice';

import { DeleteSlot } from './ModalExamples/DeleteSlot';

import "./Modal.scss"

interface Modal {
    isOpened: boolean;
    id: string;
}

type Props = {
    id: string;
}


export const Modal = ({ id }: Props) => {
    const componentStorage: any= {
        DeleteSlot: <DeleteSlot />
    }

    const modalSelector: Modal = useSelector(modal);
    const DarkMode = useSelector(selectIsDarkMode);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal({ id }))
    }

    return (
        modalSelector.isOpened && modalSelector.id === id ? (
            <div className="Modal__overlay">
                <div className={`Modal${DarkMode.isDarkMode ? " dark-mode" : ""}`}>
                    <button type="button" className={`Modal__closeBtn${DarkMode.isDarkMode ? " dark-mode" : ""}`} onClick={handleCloseModal}>X</button>
                    <div className="Modal__content">{componentStorage[id.toString()]}</div>
                </div>
            </div>
        ) : null
    );
};