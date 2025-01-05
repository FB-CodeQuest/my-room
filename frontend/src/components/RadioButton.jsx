const RadioButton = ({name, options, selected, onChange}) =>{
    return(
        <div className={"radio-group"}>
            {options.map((option) => (
                <label key={option.value} className={"radio-button"} htmlFor={`${name}-${option.value}`}>
                    <input
                        type={"radio"}
                        id={`${name}-${option.value}`}
                        name={name}
                        value={option.value}
                        checked={selected === option.value}
                        onChange={()=>onChange(option.value)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};
export default RadioButton;