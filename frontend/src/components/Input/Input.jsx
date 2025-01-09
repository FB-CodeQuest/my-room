import "./Input.scss";
import Button from "../Button/Button";
const Input = ({label, type, id, value, onChange, placeholder, className, maxLength, showLabel=false, ref}) => {
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
            />
        </div>
    );
};

const InputWithButton = ({label, type, id, value, onChange, placeholder, className, maxLength, showLabel=false, ref, children}) => {
    return(
        <div className={"input-button-wrap"}>
            {showLabel && <label htmlFor={id}>{label}</label>}
            <input
                className={`input-field ${className}`}
                ref={ref}
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
            />
            <Button type={"submit"} className={"input-btn"}>{children}</Button>
        </div>

    );
};

export default Input;
export {InputWithButton};