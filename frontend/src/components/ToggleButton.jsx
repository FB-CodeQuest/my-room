import { useState } from "react";

const ToggleButton = ({ label, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleToggle = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <div className="toggle-button-container">
            <button onClick={handleToggle} className="toggle-button">
                {label}
            </button>
            {isVisible && <div className="toggle-content">{children}</div>}
        </div>
    );
};

export default ToggleButton;
