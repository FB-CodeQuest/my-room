const DropDown = ({id, label, options, value, onChange}) => {
    return(
        <div className={"dropdown-group"}>
            {label && (
                <label htmlFor={id} className="dropdown-label">
                    {label}
                </label>
            )}
            <select
                id={id}
                value={value}
                onChange={(e) =>onChange(e.target.value)}
                className="dropdown"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropDown;