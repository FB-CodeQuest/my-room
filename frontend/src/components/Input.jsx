const Input = ({label, type, id, value, onChange, placeholder}) => {
    return(
        <div className={"input-field"}>
            <label htmlFor={id}>{label}</label>
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