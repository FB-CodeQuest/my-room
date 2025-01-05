import "./Input.scss";
const Input = ({label, type, id, value, onChange, placeholder, showLabel=false}) => {
    return(
        <div className={"input-field"}>
            {showLabel && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;