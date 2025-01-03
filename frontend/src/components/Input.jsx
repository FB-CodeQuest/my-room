const Input = ({label, type, value, onChange, placeholder}) =>{
    return(
        <div className={"form-group"}>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;