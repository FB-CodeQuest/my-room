import "./CheckBox.scss";
const CheckBox = ({id, label, checked, onChange}) => {
    return (
        <div className={"checkbox-group"}>
            <label className={"checkbox-label"} htmlFor={id}>
                <input
                    type={"checkbox"}
                    id={id}
                    checked={checked}
                    onChange={onChange}
                />
                {label}
            </label>
        </div>
    );
};
export default CheckBox;