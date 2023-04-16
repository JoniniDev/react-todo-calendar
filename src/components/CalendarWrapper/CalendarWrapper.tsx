import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDarkMode } from '../../redux/selectors/themeSelector';
import './CalendarWrapper.scss'
import { setLanguage } from '../../redux/features/language/languageSlice';
import { Dropdown } from '../Dropdown/Dropdown';

interface Props {
    children: React.ReactNode;
}

export const CalendarWrapper = ({ children }: Props) => {
    const DarkMode = useSelector(selectIsDarkMode);
    const dispatch = useDispatch()
    const handleChangeLanguage = (lang: string) => {
        dispatch(setLanguage({ langType: lang }))
    }
    return (
        <>
            <Dropdown options={[
                { label: "Українська", value: "ua" },
                { label: "English", value: "en" },
                { label: "Spain", value: "es" },
                { label: "French", value: "fr" },
            ]} onSelectOption={handleChangeLanguage} />
            <div className={`CalendarWrapper${DarkMode.isDarkMode ? " dark-mode" : " light-mode"}`}>{children}</div>
        </>
    )
}
