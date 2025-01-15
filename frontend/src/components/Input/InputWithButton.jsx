import "./Input.scss";
import Button from "../Button/Button";
import Input from "./Input";

const InputWithButton = ({
                             label,
                             type,
                             id,
                             value,
                             onChange,
                             placeholder,
                             className,
                             maxLength,
                             showLabel=false,
                             ref,
                             children,
                             btnType,
                             btnClassName,
                             btnDisabled,
                             timer,
                             onClick,
                             disabled
}) => {
    return(
        <div className={`input-button-wrap ${className}`}>
            {showLabel && <label htmlFor={id}>{label}</label>}
            <Input
                className={`input-field ${className}`}
                ref={ref}
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={disabled}
            />
            {timer && <span className="timer">{timer}</span>}
            <Button
                btnType={btnType}
                className={`input-btn ${btnClassName}`}
                btnDisabled={btnDisabled}
                onClick={onClick}
            >
                {children}
            </Button>
        </div>
    );
};

export default InputWithButton;