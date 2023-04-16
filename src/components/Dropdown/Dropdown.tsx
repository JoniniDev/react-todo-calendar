import React, { useState } from 'react';
import './Dropdown.scss';

interface DropdownProps {
    options: any;
    onSelectOption: (option: string) => void;
    initValue?: string;
}

interface Option {
    label: string;
    value: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, initValue, onSelectOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0].label);

    const handleOptionSelect = (option: Option) => {
        setSelectedOption(option.label);
        onSelectOption(option.value);
        setIsOpen(false);
    };

    return (
        <div className="Dropdown__container">
            <div className="Dropdown__header" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption}
                <i className={`Dropdown__arrow ${isOpen ? 'Dropdown__up' : 'Dropdown__down'}`} />
            </div>
            {isOpen && (
                <ul className="Dropdown__options">
                    {options.map((option: any, index: number) => (
                        <li className='Dropdown__option' key={index} onClick={() => handleOptionSelect(option)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};