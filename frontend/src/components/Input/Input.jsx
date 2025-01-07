import "./Input.scss";
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

export default Input;