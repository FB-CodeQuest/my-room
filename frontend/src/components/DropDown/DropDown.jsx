import "./DropDown.scss";
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
const DropDown = ({id, options, onChange, className}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('선택하세요');
    const optionRef = useRef(null);

    useEffect(() => {
        const content = optionRef.current;
        if(content){
            content.style.maxHeight = isOpen
                ? `${content.scrollHeight}px`
                : "0";
        }
    },[isOpen]);
    const handleOptionClick = (value) => {
        setSelectedValue(value);
        onChange(value);
        setIsOpen(false);
    };

    return(
        <div className={`dropdown-group ${className}`}>
            <button
                type="button"
                id={id}
                className={`dropdown-btn ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >

                {selectedValue}
                <FontAwesomeIcon
                    icon={faCaretDown} // 아이콘 객체를 전달
                    className="dropdown-icon"
                />
            </button>
                <div
                    className={"dropdown-menu"}
                    ref={optionRef}
                >
                    {options.map((option) => (
                        <div
                            className="dropdown-option"
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default DropDown;