import "./Input.scss";
import Button from "../Button/Button";
const Input = ({label, type, id, value, onChange, placeholder, className, maxLength, showLabel=false, ref, disabled}) => {
    return(
        <div className={`input-field ${className}`}>
            {showLabel && <label htmlFor={id}>{label}</label>}
            <input
                ref={ref}
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={disabled}
            />
        </div>
    );
};
export default Input;