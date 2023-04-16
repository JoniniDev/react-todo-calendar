import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectIsDarkMode } from '../../redux/selectors/themeSelector';
import { toggleMode } from '../../redux/features/theme/themeSlice'

import { IconSVG } from './IconSvg';
import "./IconButton.scss"

interface IconProps {
    iconColor: string;
    onClick: () => void;
}

export const IconButton: React.FC<IconProps> = ({ onClick, iconColor }) => {
    const [isDark, setIsDark] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(toggleMode())
    }, [isDark])

    const handleClick = () => {
        setIsDark(!isDark);
        onClick();
    }
    return (
        <button className={`IconButton__button ${isDark ? 'is-dark' : ''}`} type="button" onClick={handleClick}>
            <IconSVG color={iconColor} />
        </button>
    );
};