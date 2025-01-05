import "./Button.scss";
const Button = ({children, type = "button", className, onClick, disabled = false }) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            <span>{children}</span>
        </button>
    );
};
export default Button;