const Form = ({children, onSubmit, className}) => {
    return (
        <form className={"form-container"} onSubmit={onSubmit} className={className}>
            {children}
        </form>
    );
};
export default Form;