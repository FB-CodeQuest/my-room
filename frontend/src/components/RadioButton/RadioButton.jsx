import "./RadioButton.scss";
const RadioButton = ({name, options, selected, onChange, groupLabel}) =>{
    return(
        <div className={"radio-group"}>
            <p>{groupLabel}</p>
            <div className={"radio-btn-wrap"}>
                {options.map((option) => (
                    <label key={option.value} className={"radio-btn"} htmlFor={`${name}-${option.value}`}>
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
        </div>
    );
};
export default RadioButton;