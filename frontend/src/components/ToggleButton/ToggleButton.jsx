import "./ToggleButton.scss";
import {useEffect, useRef, useState} from "react";

const ToggleButton = ({ label, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const contentRef = useRef(null);

    const handleToggle = () => {
        setIsVisible((prev) => !prev);
    };

    useEffect(() => {
        const content = contentRef.current;
        if(content){
            content.style.maxHeight = isVisible
                ? `${content.scrollHeight}px`
                : "0";
        }
    },[isVisible]);

    return (
        <div className="toggle-button-container">
            <button onClick={handleToggle} className="toggle-btn">
                {label}
            </button>

            <div
                ref={contentRef}
                className={`toggle-content ${isVisible ? "active" : ""}`}
            >
                {children}
            </div>
        </div>
    );
};

export default ToggleButton;
